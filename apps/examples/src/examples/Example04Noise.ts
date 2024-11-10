import { WGSLCanvas } from "@wgsl-canvas/core";
import shaderFragment from "./Example04Noise.wgsl?raw";

export const Example04Noise = async (canvas: HTMLCanvasElement) => {
  const wgslCanvas = new WGSLCanvas({ canvas });
  await wgslCanvas.init();
  wgslCanvas.shaderFragment = shaderFragment;
  wgslCanvas.uniformsKeys = ["time"];
  wgslCanvas.uniforms.time = 0.0;

  const frame: FrameRequestCallback = (timeElapsedMilliseconds) => {
    const timeElapsed = timeElapsedMilliseconds * 0.001;
    wgslCanvas.uniforms.time = timeElapsed;
    wgslCanvas.render();

    requestAnimationFrame(frame);
  };

  requestAnimationFrame(frame);
};
