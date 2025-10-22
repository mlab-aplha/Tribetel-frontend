import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import SignInPage from "./pages/SignInPage/SignInPage";
import SignUpPage from "./pages/SignUpPage/SignUpPage";
import AdminSignInPage from "./pages/AdminSignInPage/AdminSignInPage";
import SuccessScreen from "./pages/SuccessScreen/SuccessScreen";


function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/signin" replace />} />
                <Route path="/signin" element={<SignInPage />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/success" element={<SuccessScreen />} />
                <Route path="/admin/signin" element={<AdminSignInPage />} />
            </Routes>
        </Router>
    
    );
}

export default App;
