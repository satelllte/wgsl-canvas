type H2Props = {
  children: React.ReactNode;
}

export function H2({children}: H2Props) {
  return <h2 className="text-gray12 text-xl font-medium">{children}</h2>
}
