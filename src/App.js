import React, {useState, useEffect} from "react";
import SignInSingup from "./page/SignInSingUp";
import {AuthContext} from "./utils/context";
import {isUserLogedApi} from "./api/auth";
import Routing from "./routes/Routing";

export default function App() {
  const [user, setUser] = useState(null);
  const [loadUser, setLoadUser] = useState(false);
  const [refreshCheckLogin, setRefreshCheckLogin] = useState(false)
  useEffect(() => {
    setUser(isUserLogedApi());
    setRefreshCheckLogin(false)
    setLoadUser(true);
  }, [refreshCheckLogin])

  if(!loadUser)return null;

return(
  <AuthContext.Provider value={user}>
{user ? (
   <Routing setRefreshCheckLogin={setRefreshCheckLogin}/>
): (<SignInSingup setRefreshCheckLogin={setRefreshCheckLogin}/>)}
</AuthContext.Provider>
)
}


