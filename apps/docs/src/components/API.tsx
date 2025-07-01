import { LayoutSide } from "./LayoutSide";
import { H2 } from "./ui/Heading";
import { Link } from "./ui/Link";

const links = [
  'WGSLCanvas',
  'WGSLCanvasUniform',
];

export function API() {
  return (
    <LayoutSide name="API" sidebar={(
      <div className="flex flex-col items-start">
        {links.map(link => {
          return (
            <LinkToDoc key={link} name={link} selected={false}/>
          );
        })}
      </div>
    )}>
      <div className="flex flex-col gap-2">
        <H2>WGSLCanvas</H2>
        <P>{`Class providing a high-level abstraction for rendering WebGPU fragment shader directly onto an HTML <canvas> element.`}</P>
      </div>
    </LayoutSide>
  );
}

type LinkToDocProps = {
  name: string;
  selected: boolean;
};

function LinkToDoc({name, selected}: LinkToDocProps) {
  return (
    <Link size="sm" weight={selected ? 'bold' : undefined} href={`/api/${name}`}>
      {name}
    </Link>
  );
}

// TODO: put into "ui"
function P({children}: {children: React.ReactNode}) {
  return <p className="text-gray11">{children}</p>
}
