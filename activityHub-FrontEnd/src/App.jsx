import SignInPage from "./pages/signInPage/SignInPage";
import SignUpPage from "./pages/signUpPage/SignUpPage";
import HomePage from "./pages/homePage/HomePage";
import Header from "./components/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProfilePage from "./pages/profilePage/ProfilePage";
import CreateActivityPage from "./pages/createActivityPage/CreateActivityPage";
import CreatePostPage from "./pages/createPostPage/CreatePostPage";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/create-post" element={<CreatePostPage />} />
        <Route path="/create-activity" element={<CreateActivityPage />} />
      </Routes>
    </Router>
  );
}
export default App;
