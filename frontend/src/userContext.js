import { createContext, useState } from "react";
export const UserContex = createContext({});

export function UserContexProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready] = useState(false);
  // useEffect(() => {
  //   if (!user) {
  //     axios.get("/profile").then(({ data }) => {
  //       setUser(data);
  //       setReady(true);
  //     });
  //   }
  // }, []);
  return (
    <UserContex.Provider value={{ user, setUser, ready }}>
      {children}
    </UserContex.Provider>
  );
}
