import { WGSLCanvas } from "@wgsl-canvas/core";
import shaderFragment from "./Example03Texture.wgsl?raw";

export const Example03Texture = async (canvas: HTMLCanvasElement) => {
  const wgslCanvas = new WGSLCanvas({ canvas });
  await wgslCanvas.init();
  const textureUrl = "/assets/textures/uv_grid/uv_grid_webgpu.jpg";
  const texture = await WGSLCanvas.loadTexture(textureUrl);
  wgslCanvas.shaderFragment = shaderFragment;
  wgslCanvas.textures = [texture];
  wgslCanvas.render();
};
