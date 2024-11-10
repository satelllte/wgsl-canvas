import { WGSLCanvas } from "@wgsl-canvas/core";
import { Example00Default } from "./examples/Example00Default";
import { Example01Color } from "./examples/Example01Color";
import { Example02Uniforms } from "./examples/Example02Uniforms";
import { Example03Texture } from "./examples/Example03Texture";
import { Example04Noise } from "./examples/Example04Noise";

const examples = [
  Example00Default,
  Example01Color,
  Example02Uniforms,
  Example03Texture,
  Example04Noise,
];

const main = async () => {
  if (!WGSLCanvas.isSupported()) {
    alert("WebGPU is not supported in this browser");
    return;
  }

  const container = document.getElementById("examples");
  if (!container) return;

  for (const example of examples) {
    const canvas = document.createElement("canvas");
    canvas.width = 250;
    canvas.height = 250;
    container.appendChild(canvas);
    await example(canvas);
  }
};

void main();
