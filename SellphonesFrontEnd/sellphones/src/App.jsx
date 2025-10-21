import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./components/layouts/MainLayout"; 
import HomePage from "./components/pages/HomePage/HomePage"; 

export default function App() {


  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <MainLayout>
              <HomePage />
            </MainLayout>
          }
        />
      </Routes>
    </Router>
  );
}