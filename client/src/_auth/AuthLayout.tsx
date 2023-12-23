import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "../store/store";

export default function AuthLayout() {
  const { user } = useSelector((s: RootState) => s.auth);
  if (user) {
    return <Navigate to="/" />;
  } else {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-200">
        <Outlet />
      </div>
    );
  }
}
