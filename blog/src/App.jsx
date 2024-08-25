import React, { useContext } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Authpage from "./pages/Authpage";
import Footer from "./components/Footer";
import PostListpage from "./pages/PostListpage";
import CreatePostPage from "./pages/CreatePostPage";
import PostPage from "./pages/PostPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <BrowserRouter>
      <ToastContainer />
      <Navbar />
      <main className="min-h-screen">
        <Routes>
          <Route path="/" element={<PostListpage />} />
          <Route path="/login" element={<Authpage />} />
          <Route path="/create-post" element={<CreatePostPage />} />
          <Route path="/post/:id" element={<PostPage />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
