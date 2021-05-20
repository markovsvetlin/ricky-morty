import { useState, useEffect } from 'react';

const useDarkMode = () => {
  const [theme, setTheme] = useState('');

  const setMode = (mode) => {
    window.localStorage.setItem('theme', mode);
    setTheme(mode);
  };

  const toggleTheme = () => {
    theme === 'dark' ? setMode('light') : setMode('dark');
  };

  useEffect(() => {
    const localTheme = window.localStorage.getItem('theme');
    localTheme === 'dark' ? setMode('light') : setMode('dark');
  }, []);
  return [theme, toggleTheme];
};

export default useDarkMode;
