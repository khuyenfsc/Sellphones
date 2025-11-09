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
import CheckoutPage from "./components/pages/CartPage/CheckoutPage";
import RegisterPage from "./components/pages/LoginPage/RegisterPage";
import ActiveProfilePage from "./components/pages/LoginPage/ActiveProfilePage";
import OAuth2UpdatePage from "./components/pages/LoginPage/OAuth2UpdatePage";
import PasswordResetPage from "./components/pages/LoginPage/PasswordResetPage";
import OrderSuccessPage from "./components/pages/OrderPage/OrderSuccessPage";
import VNPaySuccessPage from "./components/pages/OrderPage/VNPaySuccessPage";
import VNPayFailedPage from "./components/pages/OrderPage/VNPayFailedPage";
import NotFoundPage from "./components/pages/NotFoundPage/NotFoundPage";
import AdminLoginPage from "./components/admin/components/LoginPage/AdminLoginPage";
import AdminDashboardPage from "./components/admin/components/DashboardPage/AdminDashboardPage";
import ProtectedRoute from "./components/Route/ProtectedRoute";
import AdminProtectedRoute from "./components/Route/AdminProtectedRoute";
import AdminMainLayout from "./components/admin/components/layouts/AdminMainLayout";
import { AuthProvider } from "./context/AuthContext";
import { AdminAuthProvider } from "./components/admin/context/AdminAuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* ---------------- USER / PUBLIC ROUTES ---------------- */}
        <Route
          element={
            <AuthProvider>
              <MainLayout />
            </AuthProvider>
          }
        >
          <Route path="/" element={<HomePage />} />
          <Route path="/category/:slug" element={<ProductsByCategoryPage />} />
          <Route path="/product/:slug" element={<ProductDetailsPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/active-profile" element={<ActiveProfilePage />} />
          <Route path="/oauth2/complete-register" element={<OAuth2UpdatePage />} />
          <Route path="/reset-password" element={<PasswordResetPage />} />

          {/* Protected user routes */}
          <Route
            path="/dashboard/*"
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
          <Route
            path="/order/success"
            element={
              <ProtectedRoute>
                <OrderSuccessPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/payment/vnpay/success"
            element={
              <ProtectedRoute>
                <VNPaySuccessPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/payment/vnpay/fail"
            element={
              <ProtectedRoute>
                <VNPayFailedPage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Route>


        {/* ---------------- ADMIN ROUTES ---------------- */}
        <Route
          path="/admin/login"
          element={
            <AdminAuthProvider>
              <AdminLoginPage />
            </AdminAuthProvider>
          }
        />

        <Route
          path="/admin"
          element={
            <AdminAuthProvider>
              <AdminProtectedRoute>
                <AdminMainLayout />
              </AdminProtectedRoute>
            </AdminAuthProvider>
          }
        >
          <Route path="dashboard" element={<AdminDashboardPage />} />
          {/* Các admin sub-routes khác */}
        </Route>

      </Routes>

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
  );
}