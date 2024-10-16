import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Authpage from "./pages/Authpage";
import Footer from "./components/Footer";
import PostListpage from "./pages/PostListpage";
import CreatePostPage from "./pages/CreatePostPage";
import PostPage from "./pages/PostPage";
import EditPostpage from "./pages/EditPostPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
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
          <Route path="/create-post" element={<CreatePostPage />} />
          <Route path="/post/:id" element={<PostPage />} />
          <Route path="/edit/:id" element={<EditPostpage />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
