// Work-in-progress ...

type H1Props = React.ComponentProps<'h1'>;
type MDXH1Props = Omit<H1Props, 'className'>;
function MDXH1(props: MDXH1Props) {
  return <h1 {...props} className='text-3xl text-gray-50'/>
}

type H2Props = React.ComponentProps<'h2'>;
type MDXH2Props = Omit<H2Props, 'className'>;
function MDXH2(props: MDXH2Props) {
  return <h2 {...props} className='text-2xl text-gray-50'/>
}

export const components = {
  h1: MDXH1,
  h2: MDXH2,
};
