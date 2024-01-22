import { useEffect, createContext, useState, useMemo } from 'react';
const ThemeContext = createContext({});

const theme = {
  light: {
    theme: 'light',
    color: '#000',
    backgroundColor: '#fff'
  },
  dark: {
    theme: 'dark',
    color: '#fff',
    backgroundColor: '#000'
  }
};
export function ThemeProvider({ children }) {
  const [mode, setMode] = useState('light');
  const [themeData, setThemeData] = useState(theme.light);
  useEffect(() => {
    setThemeData(theme[mode]);
  }, [mode]);
  const value = useMemo(
    () => ({ mode, setMode, themeData }),
    [mode, themeData, setMode]
  );
  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export default ThemeContext;
