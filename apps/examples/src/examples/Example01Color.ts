import { WGSLCanvas } from "@wgsl-canvas/core";
import shaderFragment from "./Example01Color.wgsl?raw";

export const Example01Color = async (canvas: HTMLCanvasElement) => {
  const wgslCanvas = new WGSLCanvas({ canvas });
  await wgslCanvas.init();
  wgslCanvas.shaderFragment = shaderFragment;
  wgslCanvas.render();
};
