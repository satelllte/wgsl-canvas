import { WGSLCanvas } from "@wgsl-canvas/core";
import shaderFragment from "./main.fragment.wgsl?raw";

const main = async () => {
  if (!WGSLCanvas.isSupported()) {
    alert("WebGPU is not supported in this browser");
    return;
  }

  const canvas = document.createElement("canvas");
  canvas.width = 500;
  canvas.height = 500;
  document.body.appendChild(canvas);

  const wgslCanvas = new WGSLCanvas({ canvas });
  await wgslCanvas.init();
  wgslCanvas.shaderFragment = shaderFragment;
  wgslCanvas.uniformsKeys = ["timeElapsed"];
  wgslCanvas.uniforms.time = 0.0;

  const frame: FrameRequestCallback = (timeElapsedMilliseconds) => {
    const timeElapsed = timeElapsedMilliseconds * 0.001;
    wgslCanvas.uniforms.timeElapsed = timeElapsed;
    wgslCanvas.render();

    requestAnimationFrame(frame);
  };

  requestAnimationFrame(frame);
};

void main();
