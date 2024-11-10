import { WGSLCanvas } from "@wgsl-canvas/core";
import shaderFragment from "./Example02Uniforms.wgsl?raw";

export const Example02Uniforms = async (canvas: HTMLCanvasElement) => {
  const wgslCanvas = new WGSLCanvas({ canvas });
  await wgslCanvas.init();
  wgslCanvas.shaderFragment = shaderFragment;
  wgslCanvas.uniformsKeys = ["time", "color1", "color2"];
  wgslCanvas.uniforms.time = 0.0;
  wgslCanvas.uniforms.color1 = [1.0, 0.0, 0.0];
  wgslCanvas.uniforms.color2 = [0.0, 0.0, 1.0];

  const frame: FrameRequestCallback = (timeElapsedMilliseconds) => {
    const timeElapsed = timeElapsedMilliseconds * 0.001;
    wgslCanvas.uniforms.time = timeElapsed;
    wgslCanvas.render();

    requestAnimationFrame(frame);
  };

  requestAnimationFrame(frame);
};
