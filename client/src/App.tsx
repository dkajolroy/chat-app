import { Route, Routes } from "react-router-dom";
import AuthLayout from "./_auth/AuthLayout";
import LoginPage from "./_auth/forms/LoginPage";
import SignupPage from "./_auth/forms/SignupPage";
import RootLayout from "./_root/RootLayout";
import NotFound from "./_root/pages/NotFound";
import ChatPage from "./_root/pages/chats/ChatPage";
import ScrollTop from "./components/ScrollTop";
import SocketProvider from "./context/SocketProvider";

export default function App() {
  // const { user } = useSelector((s: RootState) => s.auth);
  return (
    <SocketProvider>
      <ScrollTop />
      <Routes>
        {/* Private routes */}
        <Route element={<RootLayout />}>
          <Route path="/" element={<ChatPage />} />
          <Route path="/:chatId" element={<ChatPage />} />
        </Route>
        {/* Public routes */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Route>
        {/* Unknown routes */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </SocketProvider>
  );
}
