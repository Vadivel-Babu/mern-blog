import React, { useContext, useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Authpage from "./pages/Authpage";
import Footer from "./components/Footer";
import PostListpage from "./pages/PostListpage";
import CreatePostPage from "./pages/CreatePostPage";
import PostPage from "./pages/PostPage";
import EditPostpage from "./pages/EditPostPage";
import NotificationPage from "./pages/NotificationPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useFetchMe from "./services/userApi/getUser";
import { Usercontext } from "./UserContext";
import Profilepage from "./pages/Profilepage";
import EditProfilePage from "./pages/EditProfilePage";

const App = () => {
  const { data, isLoading, isError, error } = useFetchMe();
  const { user, handleUser, handleLogout } = useContext(Usercontext);

  useEffect(() => {
    if (data?.data && !isError) {
      handleUser(data?.data);
    }
  }, [isLoading, data, isError]);

  return (
    <BrowserRouter>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        theme="dark"
        hideProgressBar
        pauseOnFocusLoss={false}
      />
      <Navbar />
      <main className="min-h-screen">
        <Routes>
          <Route path="/" element={<PostListpage />} />
          <Route path="/login" element={<Authpage />} />
          <Route
            path="/create-post"
            element={
              user ? (
                <CreatePostPage />
              ) : (
                <Navigate to="/login" replace={true} />
              )
            }
          />
          <Route
            path="/notification"
            element={
              user ? (
                <NotificationPage />
              ) : (
                <Navigate to="/login" replace={true} />
              )
            }
          />
          <Route path="/post/:id" element={<PostPage />} />
          <Route path="/edit/:id" element={<EditPostpage />} />
          <Route path="/profile/:id" element={<Profilepage />} />
          <Route path="/edit-profile/:id" element={<EditProfilePage />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
