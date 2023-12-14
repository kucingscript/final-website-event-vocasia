import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../config/firebase";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {
    const unsubscribed = onAuthStateChanged(auth, (user) => {
      if (user?.emailVerified) {
        setIsLogin(true);
      } else {
        setIsLogin(false);
      }
    });

    return () => unsubscribed();
  }, []);

  return isLogin ? <Outlet /> : <Navigate to={"/login"} />;
};

export default ProtectedRoutes;
