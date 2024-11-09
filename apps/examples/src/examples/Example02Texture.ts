import { WGSLCanvas } from "@wgsl-canvas/core";
import shaderFragment from "./Example02Texture.wgsl?raw";

export const Example02Texture = async (canvas: HTMLCanvasElement) => {
  const wgslCanvas = new WGSLCanvas({ canvas });
  await wgslCanvas.init();
  const textureUrl = "/assets/textures/uv_grid/uv_grid_webgpu.jpg";
  const texture = await WGSLCanvas.loadTexture(textureUrl);
  wgslCanvas.shaderFragment = shaderFragment;
  wgslCanvas.textures = [texture];
  wgslCanvas.render();
};
