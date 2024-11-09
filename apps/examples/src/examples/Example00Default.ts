import { WGSLCanvas } from "@wgsl-canvas/core";

export const Example00Default = async (canvas: HTMLCanvasElement) => {
  const wgslCanvas = new WGSLCanvas({ canvas });
  await wgslCanvas.init();
  wgslCanvas.render();
};
