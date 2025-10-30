import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./components/layouts/MainLayout"; 
import HomePage from "./components/pages/HomePage/HomePage"; 
import ProductsByCategoryPage from "./components/pages/ProductsByCategoryPage/ProductsByCategoryPage"; 
import ProductDetailsPage from "./components/pages/ProductDetailsPage/ProductDetailsPage";
import SearchPage from "./components/pages/SearchPage/SearchPage";


export default function App() {


  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/category/:slug" element={<ProductsByCategoryPage />} />
          <Route path="/product/:slug" element={<ProductDetailsPage />} />
          <Route path="/search" element={<SearchPage />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}