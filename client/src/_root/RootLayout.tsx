import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "../store/store";

export default function RootLayout() {
  const { user } = useSelector((s: RootState) => s.auth);

  if (!user) {
    return <Navigate to="/login" />;
  } else {
    return (
      <div>
        {/* This is Private page Layout */}
        <Outlet />
      </div>
    );
  }
}
