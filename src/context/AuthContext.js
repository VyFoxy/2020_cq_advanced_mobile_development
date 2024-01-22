import { useEffect, createContext, useState, useMemo } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState();
  useEffect(() => {
    async function storeTokens() {
      console.log(auth);
      await AsyncStorage.setItem('accessToken', auth.tokens.access.token);
      await AsyncStorage.setItem('refreshToken', auth.tokens.refresh.token);
      await AsyncStorage.setItem('avatar', auth.user.avatar);
      await AsyncStorage.setItem('name', auth.user.name);
    }
    if (auth) storeTokens();
  }, [auth]);
  const value = useMemo(() => ({ auth, setAuth }), [auth, setAuth]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContext;
