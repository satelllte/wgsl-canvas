import { WGSLCanvasShaderFragment } from "./WGSLCanvas.shader.fragment.wgsl.js";
import { WGSLCanvasShaderVertex } from "./WGSLCanvas.shader.vertex.wgsl.js";
import type { WGSLCanvasUniform } from "./WGSLCanvasUniform.js";

export class WGSLCanvas {
  /**
   * Uniforms object
   */
  public readonly uniforms: Record<string, WGSLCanvasUniform> = {};
  /**
   * Keys for "uniforms" object
   */
  public uniformsKeys: string[] = [];
  /**
   * Textures list
   */
  public textures: GPUCopyExternalImageSource[] = [];

  /**
   * Default fragment shader
   */
  public static readonly SHADER_FRAGMENT_DEFAULT = WGSLCanvasShaderFragment;

  private _shaderFragmentNeedsUpdate = false;
  private _shaderFragment: string = WGSLCanvas.SHADER_FRAGMENT_DEFAULT;

  /**
   * Gets current fragment shader WGSL code
   */
  public get shaderFragment(): string {
    return this._shaderFragment;
  }
  /**
   * Sets fragment shader WGSL code
   */
  public set shaderFragment(value: string) {
    this._shaderFragment = value;
    this._shaderFragmentNeedsUpdate = true;
  }

  private readonly _canvas: HTMLCanvasElement;
  private readonly _context: GPUCanvasContext;
  private readonly _format: GPUTextureFormat;
  private _adapter: GPUAdapter | undefined;
  private _device: GPUDevice | undefined;

  constructor({ canvas }: { canvas: HTMLCanvasElement }) {
    this._canvas = canvas;

    const _context = this._canvas.getContext("webgpu");
    if (!_context) throw new Error("Unable to get WebGPU context");
    this._context = _context;

    this._format = navigator.gpu.getPreferredCanvasFormat();
  }

  /**
   * Initializes internal canvas GPU context.
   * Must run once after the creation of "WGSLCanvas" instance.
   */
  public async init(): Promise<void> {
    this._adapter = (await navigator.gpu.requestAdapter()) || undefined;
    if (!this._adapter) throw new Error("Failed to request WebGPU adapter");

    this._device = await this._adapter.requestDevice();

    this._context.configure({
      device: this._device,
      format: this._format,
      alphaMode: "premultiplied",
    });
  }

  /**
   * Checks if WebGPU is supported on this browser/device.
   */
  public static isSupported(): boolean {
    return !!navigator.gpu;
  }

  /**
   * Loads texture from URL, creates bitmap image that can be further drawn on the canvas through shader.
   */
  public static async loadTexture(url: string): Promise<ImageBitmap> {
    const res = await fetch(url);
    const blob = await res.blob();
    return await createImageBitmap(blob);
  }

  private _shaderModuleVertex: GPUShaderModule | undefined;
  private _shaderModuleFragment: GPUShaderModule | undefined;
  private _renderPipeline: GPURenderPipeline | undefined;
  private _sampler: GPUSampler | undefined;

  /**
   * Renders shader output to the canvas.
   */
  public render(): void {
    if (!this._device) return;
    const device = this._device;

    if (!this._shaderModuleVertex) {
      this._shaderModuleVertex = device.createShaderModule({
        code: WGSLCanvasShaderVertex,
      });
    }
    const shaderModuleVertex = this._shaderModuleVertex;

    if (
      !this._shaderModuleFragment ||
      this._shaderFragmentNeedsUpdate ||
      !this._renderPipeline
    ) {
      this._shaderModuleFragment = device.createShaderModule({
        code: this._shaderFragment,
      });
      this._shaderFragmentNeedsUpdate = false;
      const shaderModuleFragment = this._shaderModuleFragment;

      this._renderPipeline = device.createRenderPipeline({
        layout: "auto",
        primitive: { topology: "triangle-list" },
        vertex: {
          module: shaderModuleVertex,
          entryPoint: "vertex_main",
        },
        fragment: {
          module: shaderModuleFragment,
          entryPoint: "fragment_main",
          targets: [
            { format: this._format },
          ] as const satisfies Iterable<GPUColorTargetState>,
        },
      });
    }
    const renderPipeline = this._renderPipeline;

    const commandEncoder = device.createCommandEncoder();

    const renderPassEncoder = commandEncoder.beginRenderPass({
      colorAttachments: [
        {
          clearValue: { r: 0.0, g: 0.0, b: 0.0, a: 0.0 },
          view: this._context.getCurrentTexture().createView(),
          loadOp: "clear",
          storeOp: "store",
        },
      ] as const satisfies Iterable<GPURenderPassColorAttachment>,
    });

    const bindGroupEntries: GPUBindGroupEntry[] = [];
    {
      let binding = 0;

      if (this.uniformsKeys.length > 0) {
        const uniforms: WGSLCanvasUniform[] = [];
        this.uniformsKeys.forEach((key) => {
          if (!this.uniforms[key]) return;
          uniforms.push(this.uniforms[key]);
        });
        const data = std140(uniforms);
        const buffer = device.createBuffer({
          size: data.byteLength,
          usage: GPUBufferUsage.COPY_DST | GPUBufferUsage.UNIFORM,
        });

        device.queue.writeBuffer(buffer, data.byteOffset, data);

        bindGroupEntries.push({
          binding: binding++,
          resource: {
            buffer,
          } satisfies GPUBufferBinding satisfies GPUBindingResource,
        });
      }

      if (this.textures.length > 0) {
        if (!this._sampler) this._sampler = device.createSampler();
        const sampler = this._sampler;

        bindGroupEntries.push({
          binding: binding++,
          resource: sampler satisfies GPUBindingResource satisfies GPUSampler,
        });

        for (const texture of this.textures) {
          let width = 0;
          let height = 0;

          if (texture instanceof VideoFrame) {
            width = texture.displayWidth;
            height = texture.displayHeight;
          } else {
            width = texture.width;
            height = texture.height;
          }

          const _texture = device.createTexture({
            size: [width, height],
            format: "rgba8unorm",
            usage:
              GPUTextureUsage.RENDER_ATTACHMENT |
              GPUTextureUsage.TEXTURE_BINDING |
              GPUTextureUsage.COPY_DST,
          });

          device.queue.copyExternalImageToTexture(
            { source: texture, flipY: true },
            { texture: _texture },
            { width, height }
          );

          bindGroupEntries.push({
            binding: binding++,
            resource:
              _texture.createView() satisfies GPUBindingResource satisfies GPUTextureView,
          });
        }
      }
    }

    if (bindGroupEntries.length > 0) {
      const bindGroup = device.createBindGroup({
        layout: renderPipeline.getBindGroupLayout(0),
        entries: bindGroupEntries,
      });
      renderPassEncoder.setBindGroup(0, bindGroup);
    }

    renderPassEncoder.setPipeline(renderPipeline);
    renderPassEncoder.draw(3);
    renderPassEncoder.end();

    device.queue.submit([commandEncoder.finish()]);
  }
}

/**
 * Packs uniforms into a std140 compliant array buffer.
 * ---
 * Credit:
 * https://github.com/CodyJasonBennett/four
 */
function std140(uniforms: WGSLCanvasUniform[]): Float32Array {
  const values = uniforms;

  // Calculate offset
  let offset = 0;
  for (const value of values) {
    if (typeof value === "number") {
      offset++; // leave empty space to stack primitives
    } else {
      const pad = value.length <= 2 ? pad2 : pad4;
      offset = pad(offset); // fill in empty space
      offset += pad(value.length);
    }
  }
  offset = pad4(offset); // align to 4 bytes

  // Init buffer
  let buffer = new Float32Array(offset);

  // Pack buffer
  offset = 0;
  for (const value of values) {
    if (typeof value === "number") {
      buffer[offset++] = value;
    } else {
      const pad = value.length <= 2 ? pad2 : pad4;
      buffer.set(value, (offset = pad(offset)));
      offset += pad(value.length);
    }
  }

  return buffer;
}

// Pad to 16 byte chunks of 2, 4 (std140 layout)
function pad2(n: number) {
  return n + (n % 2);
}
function pad4(n: number) {
  return n + ((4 - (n % 4)) % 4);
}
