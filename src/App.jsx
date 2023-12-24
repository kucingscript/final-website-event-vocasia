import { Route, Routes } from "react-router-dom";
import {
  About,
  AdminDashboard,
  Contact,
  CreateEvent,
  DetailedEvent,
  EventCheckout,
  Home,
  Login,
  PagesNotFound,
  Register,
  TableDataComments,
  TableDataEvents,
  TableDataOrders,
  TableDataUsers,
  UpdateEvent,
} from "./pages";
import ProtectedRoutes from "./lib/ProtectedRoutes";
import { useEffect, useState } from "react";
import { collection, getDocs, or, query, where } from "firebase/firestore";
import { DB, auth } from "./config/firebase";
import { onAuthStateChanged } from "firebase/auth";
import AdminRoutes from "./lib/AdminRoutes";
import { UserContext } from "./context";
import { ShowNotification } from "./components";

const App = () => {
  const [userRole, setUserRole] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const [userCredentials, setUserCredentials] = useState({});
  const [userIsLoading, setUserIsLoading] = useState(false);
  const [orders, setOrders] = useState([]);

  const fetchUserData = async (email) => {
    try {
      setUserIsLoading(true);

      const userQuery = query(
        collection(DB, "users"),
        where("email", "==", email)
      );
      const orderQuery = query(
        collection(DB, "orders"),
        where("email", "==", email)
      );

      const userQuerySnapshot = await getDocs(userQuery);
      const orderQuerySnapshot = await getDocs(orderQuery);

      if (!userQuerySnapshot.empty) {
        const userData = userQuerySnapshot.docs[0].data();
        setUserCredentials(userData);
        setUserRole(userData.role);
      }

      if (!orderQuerySnapshot.empty) {
        const orderData = orderQuerySnapshot.docs.map((doc) => doc.data());
        setOrders(orderData);
      }

      setUserIsLoading(false);
    } catch (error) {
      setUserIsLoading(false);
      ShowNotification({
        title: "Error",
        text: error.message,
        icon: "error",
      });
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
    <UserContext.Provider
      value={[
        userRole,
        setUserRole,
        isLogin,
        userCredentials,
        userIsLoading,
        orders,
        setOrders,
      ]}
    >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/events/:id" element={<DetailedEvent />} />

        <Route element={<ProtectedRoutes />}>
          <Route path="/contact" element={<Contact />} />
          <Route path="/events/checkout/:id" element={<EventCheckout />} />
        </Route>

        <Route path="/admin" element={<AdminRoutes userRole={userRole} />}>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="users" element={<TableDataUsers />} />
          <Route path="events" element={<TableDataEvents />} />
          <Route path="comments" element={<TableDataComments />} />
          <Route path="orders" element={<TableDataOrders />} />
          <Route path="events/create" element={<CreateEvent />} />
          <Route path="events/update/:eventId" element={<UpdateEvent />} />
        </Route>

        <Route path="/*" element={<PagesNotFound />} />
      </Routes>
    </UserContext.Provider>
  );
};

export default App;
