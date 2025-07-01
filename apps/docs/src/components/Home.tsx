export function Home() {
  return (
    <div className="px-4 mx-auto max-w-2xl py-[15vh]">
      <Top/>
      <Installation/>
      <InstallationTS/>
      <GetStarted/>
      <PassingShader/>
      <PassingUniforms/>
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
      <img src="/assets/uv.png" alt="Default fragment shader" className="max-w-[500px] w-full" width={500} height={500}/>
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
      <Note type="tip">If you want to store your WGSL code under <CodeInline>.wgsl</CodeInline> files, you should configure your bundler to be able to resolve them as strings. The easiest way is to start with <Link href="https://vite.dev/">Vite</Link>, which can do this out of the box using <Link href="https://vite.dev/guide/assets#importing-asset-as-string"><CodeInline>?raw</CodeInline> suffix</Link>.</Note>
    </SectionStack>
  )
}

function PassingUniforms() {
  return (
    <SectionStack>
      <H2>Passing uniforms</H2>
      <P>To pass uniforms to your shader, you should first define them in <CodeInline>uniformsKeys</CodeInline> array in your <CodeInline>WGSLCanvas</CodeInline> instance.</P>
      <Code>{`wgslCanvas.uniformsKeys = ["time", "color1", "color2"];`}</Code>
      <P>Then, you can pass the values into <CodeInline>uniforms</CodeInline> object.</P>
      <Code>{`wgslCanvas.uniforms.time = 0.0;
wgslCanvas.uniforms.color1 = [1.0, 0.0, 0.0];
wgslCanvas.uniforms.color2 = [0.0, 0.0, 1.0];`}</Code>
      <P>Then, they'll be available under <CodeInline>{`var<uniform>`}</CodeInline> object at <CodeInline>{`@group(0), @binding(0)`}</CodeInline> in your WGSL shader.</P>
      <Code>{`@group(0) @binding(0) var<uniform> uniforms: Uniforms;

struct Uniforms {
  time: f32,
  color1: vec3<f32>,
  color2: vec3<f32>,
}`}</Code>
      <Note type="important">The order of keys in <CodeInline>struct Uniforms</CodeInline> must be the same as defined in <CodeInline>uniformsKeys</CodeInline> array!</Note>
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

function H2({children}: {children: React.ReactNode}) {
  return <h2 className="text-xl font-medium">{children}</h2>
}

function P({children}: {children: React.ReactNode}) {
  return <p className="text-gray11">{children}</p>
}

function Note({type, children}: {type: 'tip' | 'important', children: React.ReactNode}) {
  let mark = 'Tip';
  if (type === 'important') mark = 'Important';

  return <div className="pl-4 flex flex-col gap-1 border-l-2 border-gray05">
    <div className="text-gray11 flex items-center gap-1"><IconInfo/> <span className="font-medium">{mark}</span></div>
    <P>
      {children}
    </P>
  </div>
}

function Link({href, children}: {href: string, children: React.ReactNode}) {
  return <a href={href}
    className="underline decoration-[1.5px] decoration-gray10 text-gray11 hover:decoration-gray12 hover:text-gray12 motion-safe:transition-colors"
    target="_blank"
    rel="noopener noreferrer"
  >{children}</a>
}

function Code({ children }: {children: React.ReactNode}) {
  return (
    <code className="text-gray11 text-sm px-3 py-2 bg-gray02 rounded-md w-full flex min-h-10 items-center border border-gray03 border-solid overflow-x-auto">
      <pre>
        {children}
      </pre>
    </code>
  );
}

function CodeInline({ children }: { children: React.ReactNode }) {
  return (
    <code className="text-gray11 text-sm rounded-md border border-gray03 border-solid bg-gray02 py-0.5 px-1">{children}</code>
  )
}

function IconInfo() {
  return (
    <svg width="16" height="16" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M7.49991 0.876892C3.84222 0.876892 0.877075 3.84204 0.877075 7.49972C0.877075 11.1574 3.84222 14.1226 7.49991 14.1226C11.1576 14.1226 14.1227 11.1574 14.1227 7.49972C14.1227 3.84204 11.1576 0.876892 7.49991 0.876892ZM1.82707 7.49972C1.82707 4.36671 4.36689 1.82689 7.49991 1.82689C10.6329 1.82689 13.1727 4.36671 13.1727 7.49972C13.1727 10.6327 10.6329 13.1726 7.49991 13.1726C4.36689 13.1726 1.82707 10.6327 1.82707 7.49972ZM8.24992 4.49999C8.24992 4.9142 7.91413 5.24999 7.49992 5.24999C7.08571 5.24999 6.74992 4.9142 6.74992 4.49999C6.74992 4.08577 7.08571 3.74999 7.49992 3.74999C7.91413 3.74999 8.24992 4.08577 8.24992 4.49999ZM6.00003 5.99999H6.50003H7.50003C7.77618 5.99999 8.00003 6.22384 8.00003 6.49999V9.99999H8.50003H9.00003V11H8.50003H7.50003H6.50003H6.00003V9.99999H6.50003H7.00003V6.99999H6.50003H6.00003V5.99999Z"
        fill="currentColor"
        fill-rule="evenodd"
        clip-rule="evenodd"
      />
    </svg>
  )
}