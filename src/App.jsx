import "./App.css";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Login from "./component/Login";
import Signup from "./component/Signup";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./component/Home";
import Navbar from "./component/Navbar";
import AddBlog from "./component/AddBlog";
import UserContextProvider from "./context/UserContextProvider";
import BlogListByUser from "./component/BlogListByUser";
import BlogDashboard from "./component/BlogDashboard";
import BlogList from "./component/BlogList";
import Blog from "./component/Blog";
import React from "react";
import Circuits from "./component/pages/Circuits";

function App() {
  return (
    <UserContextProvider>
      <Router>
        <Navbar />
        <>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<BlogDashboard />} />
            <Route path="/addBlog" element={<AddBlog />} />
            <Route path="/blogs" element={<BlogListByUser />} />
            <Route path="/viewBlogs" element={<BlogList />} />
            <Route path="/blog/:id" element={<Blog />} />
            <Route path="/subjects/circuits" element={<Circuits />} />
          </Routes>
        </>
      </Router>
    </UserContextProvider>
  );
}

export default App;
