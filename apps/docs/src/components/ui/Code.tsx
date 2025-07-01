const classNameBase = 'text-gray11 text-sm rounded-md bg-gray02 border border-solid border-gray03';

type CodeProps = {
  children: React.ReactNode;
};

export function Code({ children }: CodeProps) {
  return (
    <code className={`${classNameBase} px-3 py-2 min-h-10 flex items-center w-full overflow-x-auto`}>
      <pre>
        {children}
      </pre>
    </code>
  );
}

type CodeInlineProps = {
  children: React.ReactNode;
}

export function CodeInline({ children }: CodeInlineProps) {
  return (
    <code className={`${classNameBase} py-0.5 px-1`}>
      {children}
    </code>
  )
}
