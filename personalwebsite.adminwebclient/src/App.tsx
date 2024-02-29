import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./components/layout/Dashboard";
import AuthContextProvider from "./contexts/AuthContext/AuthContext";
import { Toaster } from "./components/ui/toaster";
import WelcomePage from "./pages/welcomepage/WelcomePage";
import CreateBlogPost from "./pages/createblogpost/CreateBlogPost";
import UpdateBlogPost from "./pages/updateblogpost/UpdateBlogPost";
import BlogPosts from "./pages/blogposts/BlogPosts";
import Categories from "./pages/categories/Categories";
import Comments from "./pages/comments/Comments";

function App() {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />}>
            <Route index element={<WelcomePage />} />
            <Route path="blogposts" element={<BlogPosts />} />
            <Route path="createblogpost" element={<CreateBlogPost />} />
            <Route path="updateblogpost/:blogId" element={<UpdateBlogPost />} />
            <Route path="comments" element={<Comments />} />
            <Route path="categories" element={<Categories />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster />
    </AuthContextProvider>
  );
}

export default App;
