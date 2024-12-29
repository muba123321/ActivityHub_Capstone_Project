import SignInPage from "./pages/signInPage/SignInPage";
import SignUpPage from "./pages/signUpPage/SignUpPage";
import HomePage from "./pages/homePage/HomePage";
import Header from "./components/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProfilePage from "./pages/profilePage/ProfilePage";
import CreateActivityPage from "./pages/createActivityPage/CreateActivityPage";
import CreatePostPage from "./pages/createPostPage/CreatePostPage";
import PrivateRoute from "./components/PrivateRoute";
import EditActivityPage from "./pages/editActivityPage/EditActivityPage";
import ForgotPasswordScreen from "./pages/signInPage/components/ForgotPasswordScreen";
// import ResetPasswordScreen from "./pages/signInPage/components/ResetpasswordScreen";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordScreen />} />
        {/* <Route path="/reset-password" element={<ResetPasswordScreen />} /> */}

        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/create-post" element={<CreatePostPage />} />
          <Route path="/create-activity" element={<CreateActivityPage />} />
          <Route path="/edit-activity" element={<EditActivityPage />} />
        </Route>
      </Routes>
    </Router>
  );
}
export default App;
