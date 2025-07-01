type LayoutSideProps = {
  name: string;
  children: React.ReactNode;
  sidebar?: React.ReactNode;
};

export function LayoutSide({name, children, sidebar}: LayoutSideProps) {
  return (
    <div className="p-4 flex flex-col md:flex-row gap-8 md:gap-4">
      <div className="min-w-3xs">
        <div className="flex flex-col gap-4">
          <div>
            <a href="/" className="text-gray12 font-bold text-2xl">WGSL Canvas</a>
            <div className="text-gray-11 text-sm">{name}</div>
          </div>
          {sidebar}
        </div>
      </div>
      {children}
    </div>
  )
}
