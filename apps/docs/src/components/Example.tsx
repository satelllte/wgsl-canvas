import { LayoutSide } from "./LayoutSide";
import { Link } from "./ui/Link";

const examples = [
  'color',
  'default',
  'grayscale',
  'noise',
  'swirl',
  'texture',
  'uniforms',
];

type ExampleProps = {
  name: string;
}

export function Example({ name }: ExampleProps) {
  const hrefSource = `https://github.com/satelllte/wgsl-canvas/tree/main/apps/docs/src/pages/examples/${name}.astro`;
  return (
    <LayoutSide name="Examples" sidebar={(
      <div className="flex flex-col items-start">
        {examples.map(example => {
          return (
            <LinkToExample key={example} name={example} selected={example === name}/>
          );
        })}
      </div>
    )}
    >
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-0">
          <h2 className="text-lg font-semibold">{name}</h2>
          <Link size="sm" href={hrefSource}>View source</Link>
        </div>
        <canvas id="canvas" className="max-w-[512px] w-full" width="512" height="512"></canvas>
      </div>
    </LayoutSide>
  )
}

type LinkToExampleProps = {
  name: string;
  selected: boolean;
};

function LinkToExample({name, selected}: LinkToExampleProps) {
  return (
    <Link size="sm" weight={selected ? 'bold' : undefined} href={`/examples/${name}`}>
      {name}
    </Link>
  );
}
