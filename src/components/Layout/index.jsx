import { AuthProvider } from "../../context/AuthContext";

export default function Layout({ children }) {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  );
}