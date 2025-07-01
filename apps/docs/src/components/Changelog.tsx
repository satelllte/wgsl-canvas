import { LayoutSide } from "./LayoutSide"
import { CodeInline } from "./ui/Code"

export function Changelog() {
  return (
    <LayoutSide name="Changelog">
      <div className="flex flex-col gap-8">
        <LogEntry version="v0.0.3">
          <UL>
            <LI>Marked <CodeInline>WGSLCanvas.SHADER_FRAGMENT_DEFAULT</CodeInline> as read-only.</LI>
            <LI>Simplified the signature of <CodeInline>std140</CodeInline> internal function.</LI>
          </UL>
        </LogEntry>
        <LogEntry version="v0.0.2">
          <UL>
            <LI>Updated deprecated <CodeInline>WGSLCanvas.textures</CodeInline> type.</LI>
          </UL>
        </LogEntry>
        <LogEntry version="v0.0.1">
          <UL>
            <LI>Initial release.</LI>
          </UL>
        </LogEntry>
      </div>
    </LayoutSide>
  )
}

function LogEntry({version, children}: {version: string, children: React.ReactNode}) {
  return (
    <div className="flex flex-col gap-2">
      <H2>{version}</H2>
      {children}
    </div>
  )
}

function UL({children}: {children: React.ReactNode}) {
  return (
    <ul className="list-outside list-disc text-gray11 pl-6">
      {children}
    </ul>
  )
}

function LI({children}: {children: React.ReactNode}) {
  return (
    <li className="text-gray11">{children}</li>
  )
}

// TODO: Re-use together with "Home.tsx"
function H2({children}: {children: React.ReactNode}) {
  return <h2 className="text-xl font-medium">{children}</h2>
}
