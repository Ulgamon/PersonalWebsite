import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./components/layout/Dashboard";
import AuthContextProvider from "./contexts/AuthContext/AuthContext";
import { Toaster } from "./components/ui/toaster";
import WelcomePage from "./pages/welcomepage/WelcomePage";
import CreateBlogPost from "./pages/createblogpost/CreateBlogPost";
import UpdateBlogPost from "./pages/updateblogpost/UpdateBlogPost";

function App() {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />}>
            <Route index element={<WelcomePage />} />
            <Route path="blogposts" element={<>Blog Posts</>} />
            <Route path="createblogpost" element={<CreateBlogPost />} />
            <Route path="updateblogpost/:blogId" element={<UpdateBlogPost />} />
            <Route path="comments" element={<>Comments</>} />
            <Route path="createcomment" element={<>Create Comment</>} />
            <Route path="updatecomment" element={<>Update Comment</>} />
            <Route path="categories" element={<>Categories</>} />
            <Route path="createcategory" element={<>Create Category</>} />
            <Route path="updatecategory" element={<>Update Category</>} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster />
    </AuthContextProvider>
  );
}

export default App;
