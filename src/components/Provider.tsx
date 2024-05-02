import { ThemeProvider } from 'next-themes';

type Props = {
  children: string | React.JSX.Element | React.JSX.Element[];
};

const Provider = ({ children }: Props) => {
  return (
    <ThemeProvider
      enableSystem
      disableTransitionOnChange
      storageKey='theme'
      attribute='class'
      defaultTheme='system'
    >
      {children}
    </ThemeProvider>
  );
};

export default Provider;
