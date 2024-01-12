import { useEffect, createContext, useState, useMemo } from "react";
const AvatarContext = createContext({});

export function AvatarProvider({ children }) {
  const [avatar, setAvatar] = useState(false);

  const value = useMemo(() => ({ avatar, setAvatar }), [avatar, setAvatar]);
  return (
    <AvatarContext.Provider value={value}>{children}</AvatarContext.Provider>
  );
}

export default AvatarContext;
