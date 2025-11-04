import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./components/layouts/MainLayout";
import HomePage from "./components/pages/HomePage/HomePage";
import ProductsByCategoryPage from "./components/pages/ProductsByCategoryPage/ProductsByCategoryPage";
import ProductDetailsPage from "./components/pages/ProductDetailsPage/ProductDetailsPage";
import SearchPage from "./components/pages/SearchPage/SearchPage";
import LoginPage from "./components/pages/LoginPage/LoginPage";
import UserDashboard from "./components/pages/UserDashboard/UserDashboard";
import AccountInfo from "./components/pages/UserDashboard/components/AccountInfo";
import OrderHistory from "./components/pages/UserDashboard/components/OrderHistory";
import LogoutConfirm from "./components/pages/UserDashboard/components/LogoutConfirm";
import CartPage from "./components/pages/CartPage/CartPage";
import CheckoutPage from "./components/pages/CartPage/components/CheckoutPage";
import RegisterPage from "./components/pages/LoginPage/RegisterPage";
import ActiveProfilePage from "./components/pages/LoginPage/ActiveProfilePage";
import OAuth2UpdatePage from "./components/pages/LoginPage/OAuth2UpdatePage";
import ProtectedRoute from "./components/Route/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  return (
    // ✅ Bọc AuthProvider ngoài Router
    <AuthProvider>
      <Router>
        <MainLayout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/category/:slug" element={<ProductsByCategoryPage />} />
            <Route path="/product/:slug" element={<ProductDetailsPage />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/active-profile" element={<ActiveProfilePage />} />
            <Route path="/oauth2/complete-register" element={<OAuth2UpdatePage />} />

            {/* ✅ Nested routes (Protected) */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <UserDashboard />
                </ProtectedRoute>
              }
            >
              <Route index element={<AccountInfo />} />
              <Route path="account/info" element={<AccountInfo />} />
              <Route path="account/history" element={<OrderHistory />} />
              <Route path="account/logout" element={<LogoutConfirm />} />
            </Route>

            <Route
              path="/cart"
              element={
                <ProtectedRoute>
                  <CartPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/checkout"
              element={
                <ProtectedRoute>
                  <CheckoutPage />
                </ProtectedRoute>
              }
            />


          </Routes>
        </MainLayout>

        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          draggable
          pauseOnHover
          theme="colored"
        />
      </Router>
    </AuthProvider>
  );
}
