export function Home() {
  return (
    <div className="px-4 mx-auto max-w-2xl py-[15vh]">
      <Top/>
      <Installation/>
      <InstallationTS/>
      <GetStarted/>
      <PassingShader/>
    </div>
  )
}

function Top() {
  return (
    <div className='flex flex-col gap-3 text-center'>
      <h1 className='text-4xl text-gray12 font-bold'>
        WGSL Canvas
      </h1>
      <P>Simple way to run WebGPU shaders on HTML Canvas.</P>
    </div>
  )
}

function Installation() {
  return (
    <SectionStack>
      <H2>Installation</H2>
      <Code>{`npm i --save-exact @wgsl-canvas/core`}</Code>
    </SectionStack>
  )
}

function InstallationTS() {
  return (
    <SectionStack>
      <H2>TypeScript (Recommended)</H2>
      <P>If you're using <Link href="https://www.typescriptlang.org/" >TypeScript</Link>, it would be helpful to add <Link href="https://github.com/gpuweb/types">@webgpu/types</Link>, so your codebase will be aware of WebGPU-related types.</P>
      <Code>{`npm i --save-dev @webgpu/types`}</Code>
      <P>Then add them into your <CodeInline>tsconfig.json</CodeInline>.</P>
      <Code>{`{
  // ...
  "compilerOptions": {
    // ...
    "types": ["@webgpu/types"]
  }
}`}</Code>
    </SectionStack>
  )
}

function GetStarted() {
  return (
    <SectionStack>
      <H2>Get started</H2>
      <P>Here's the base example for you to get started.</P>
      <Code>{`import { WGSLCanvas } from "@wgsl-canvas/core";

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
wgslCanvas.render();`}</Code>
      <P>If everything is set up correctly, you should see this output (which is the default fragment shader located under <CodeInline>WGSLCanvas.SHADER_FRAGMENT_DEFAULT</CodeInline> static field).</P>
      <img src="/assets/uv.png" alt="Default fragment shader" width={500} height={500}/>
    </SectionStack>
  )
}

function PassingShader() {
  return (
    <SectionStack>
      <H2>Passing shader</H2>
      <P>To pass your shader, define it as a string of WGSL code.</P>
      <Code>{`const shaderFragment = /* wgsl */\`
struct FragmentOutput {
  @location(0) color: vec4<f32>,
}

@fragment
fn fragment_main() -> FragmentOutput {
  var output: FragmentOutput;
  output.color = vec4<f32>(0.1, 0.2, 0.25, 1.0);
  return output;
}
\`;`}</Code>
      <P>Then pass it to <CodeInline>WGSLCanvas</CodeInline> instance via <CodeInline>shaderFragment</CodeInline> property.</P>
      <Code>{`wgslCanvas.shaderFragment = shaderFragment;`}</Code>
    </SectionStack>
  )
}

function SectionStack({children}: {children: React.ReactNode}) {
  return (
    <div className="pt-16 flex flex-col gap-3">
      {children}
    </div>
  )
}

function H2({children}: {children: string}) {
  return <h2 className="text-xl font-medium">{children}</h2>
}

function P({children}: {children: React.ReactNode}) {
  return <p className="text-gray11">{children}</p>
}

function Link({href, children}: {href: string, children: string}) {
  return <a href={href}
    className="underline decoration-[1.5px] decoration-gray10 text-gray11 hover:decoration-gray12 hover:text-gray12 motion-safe:transition-colors"
    target="_blank"
    rel="noopener noreferrer"
  >{children}</a>
}

function Code({ children }: {children: string}) {
  return (
    <code className="text-gray11 text-sm px-3 py-2 bg-gray02 rounded-md w-full flex min-h-10 items-center border border-gray03 border-solid">
      <pre>
        {children}
      </pre>
    </code>
  );
}

function CodeInline({ children }: { children: string }) {
  return (
    <code className="text-gray11 text-sm rounded-md border border-gray03 border-solid bg-gray02 py-0.5 px-1">{children}</code>
  )
}
