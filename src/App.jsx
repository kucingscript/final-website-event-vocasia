import { Route, Routes } from "react-router-dom";
import {
  About,
  Contact,
  DetailedEvent,
  EventCheckout,
  Home,
  Login,
  Register,
} from "./pages";
import ProtectedRoutes from "./lib/ProtectedRoutes";

const App = () => {
  return (
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

      <Route path="/*" element={<div>Page not found</div>} />
    </Routes>
  );
};

export default App;
