import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignInForm from "./components/layout/SignIn/SignInForm";
import SignInLayout from "./components/layout/SignIn/SignInLayout";
import AdminSignInPage from "./pages/AdminSignInPage/AdminSignInPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signin" element={<SignInLayout><SignInForm /></SignInLayout>} />
        <Route path="/admin-signin" element={<AdminSignInPage />} />
        <Route path="*" element={<p>404 Page Not Found</p>} />
      </Routes>
    </Router>
  );
}

export default App;
