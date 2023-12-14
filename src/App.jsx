import { Route, Routes } from "react-router-dom";
import {
  About,
  Contact,
  CreateEvent,
  DetailedEvent,
  EventCheckout,
  Home,
  Login,
  Register,
  TableDataEvents,
  TableDataUsers,
  UpdateEvent,
} from "./pages";
import ProtectedRoutes from "./lib/ProtectedRoutes";
import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { DB, auth } from "./config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import AdminRoutes from "./lib/AdminRoutes";
import { UserContext } from "./context";

const App = () => {
  const [userRole, setUserRole] = useState("");
  const [isLogin, setIsLogin] = useState(false);

  const fetchUserData = async (email) => {
    try {
      const q = query(collection(DB, "users"), where("email", "==", email));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userData = querySnapshot.docs[0].data();
        setUserRole(userData.role);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    const unsubscribed = onAuthStateChanged(auth, (user) => {
      if (user?.emailVerified) {
        fetchUserData(user.email);
        setIsLogin(true);
      } else {
        setIsLogin(false);
      }
    });

    return () => unsubscribed();
  }, []);

  return (
    <UserContext.Provider value={[userRole, setUserRole, isLogin]}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/events/:id" element={<DetailedEvent />} />

        <Route element={<ProtectedRoutes />}>
          <Route path="/events/checkout/:id" element={<EventCheckout />} />
        </Route>

        <Route path="/admin" element={<AdminRoutes userRole={userRole} />}>
          <Route path="users" element={<TableDataUsers />} />
          <Route path="events" element={<TableDataEvents />} />
          <Route path="events/create" element={<CreateEvent />} />
          <Route path="events/update/:eventId" element={<UpdateEvent />} />
        </Route>

        <Route path="/*" element={<div>Page not found</div>} />
      </Routes>
    </UserContext.Provider>
  );
};

export default App;
