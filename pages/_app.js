import Layout from '../comps/Layout';
import useDarkMode from '../comps/useDarkMode';
import Toggle from '../comps/Toggle';
import { GlobalStyles, lightTheme, darkTheme } from '../comps/globalStyles';
import { ThemeProvider } from 'styled-components';

function MyApp({ Component, pageProps }) {
  const [theme, toggleTheme] = useDarkMode();
  const themeMode = theme === 'light' ? lightTheme : darkTheme;

  return (
    <>
      <ThemeProvider theme={themeMode}>
        <Toggle theme={theme} toggleTheme={toggleTheme} />
        <Layout>
          <GlobalStyles />

          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </>
  );
}

export default MyApp;
