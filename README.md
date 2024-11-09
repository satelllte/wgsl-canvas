# wgsl-canvas

Simple way to run WebGPU shaders on HTML Canvas.

## Install

To install, run:

```sh
npm i --save-exact @wgsl-canvas/core
```

### With TypeScript (Recommended)

If you're using [TypeScript](https://www.typescriptlang.org/), it would be helpful to add [@webgpu/types](https://github.com/gpuweb/types), so your codebase will be aware of WebGPU-related types. 

To install them, run:

```sh
npm i --save-dev @webgpu/types
```

Then add them into your `tsconfig.json`:

```json
{
  // ...
  "compilerOptions": {
    // ...
    "types": ["@webgpu/types"]
  }
}
```

## Get started

Here's the base example for you to get started:

```ts
import { WGSLCanvas } from "@wgsl-canvas/core";

// 1. Check WebGPU support
if (!WGSLCanvas.isSupported()) {
  alert("WebGPU is not supported in this browser");
  return;
}

// 2. Create a canvas
const canvas = document.createElement("canvas");
canvas.width = 500;
canvas.height = 500;
document.body.appendChild(canvas);

// 3. Create an instance of "WGSLCanvas" and initialize it
const wgslCanvas = new WGSLCanvas({ canvas });
await wgslCanvas.init();

// 4. Make your first render
wgslCanvas.render();
```

If everything is set up correctly, you should see this picture (which is the default fragment shader located under `WGSLCanvas.SHADER_FRAGMENT_DEFAULT` static field):

<img alt="Default fragment shader" src="./README.shader-default.png" width="500" height="500" />
