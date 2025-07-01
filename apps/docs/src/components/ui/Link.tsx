type LinkProps = {
  size?: 'base' | 'sm';
  weight?: 'normal' | 'bold';
  href: string;
  children: React.ReactNode;
};

export function Link({size, weight, href, children}: LinkProps) {
  const internal = href.startsWith('/') && !href.startsWith('//');

  let classNameSize = 'text-base';
  if (size === 'sm') classNameSize = 'text-sm';

  let classNameWeight = 'font-normal';
  if (weight === 'bold') classNameWeight = 'font-bold';

  return (
    <a
      href={href}
      className={`${classNameSize} ${classNameWeight} underline decoration-[1.5px] decoration-gray10 text-gray11 hover:decoration-gray12 hover:text-gray12 motion-safe:transition-colors`}
      target={internal ? undefined : "_blank"}
      rel={internal ? undefined : "noopener noreferrer"}
    >
      {children}
    </a>
  )
}
