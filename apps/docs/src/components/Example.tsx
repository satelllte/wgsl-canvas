const examples = [
  'color',
  'default',
];

type ExampleProps = {
  name: string;
}

export function Example({ name }: ExampleProps) {
  const hrefSource = `https://github.com/satelllte/wgsl-canvas/tree/main/apps/docs/src/pages/examples/${name}.astro`;
  return (
    <div className="p-4 flex flex-col md:flex-row gap-4">
      <div className="min-w-3xs">
        <div className="flex flex-col gap-4">
          <div>
            <a href="/" className="text-gray12 font-bold text-2xl">WGSL Canvas</a>
            <div className="text-gray-11 text-sm">Examples</div>
          </div>
          <div className="flex flex-col items-start">
            {examples.map(example => {
              return (
                <LinkToExample key={example} name={example} selected={example === name}/>
              );
            })}
            <hr className="mt-2 text-gray07 md:hidden"/>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-0">
          <h1 className="text-lg font-semibold">{name}</h1>
          <a href={hrefSource} target="_blank" className="text-sm underline decoration-[1.5px] decoration-gray10 text-gray11 hover:decoration-gray12 hover:text-gray12 motion-safe:transition-colors">View source</a>
        </div>
        <canvas id="canvas" className="max-w-full" width="512" height="512"></canvas>
      </div>
    </div>
  )
}

type LinkToExampleProps = {
  name: string;
  selected: boolean;
};

function LinkToExample({name, selected}: LinkToExampleProps) {
  let className = "text-sm text-gray11 underline hover:decoration-gray12 hover:text-gray12 motion-safe:transition-colors inline-block";
  if (selected) {
    className += ' font-bold';
  }
  
  return (
    <a href={`/examples/${name}`} className={className}>
      {name}
    </a>
  );
}