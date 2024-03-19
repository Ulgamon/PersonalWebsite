import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { ThemeProvider } from "./context/theme-provider";
import Home from "./pages/Home";
import Blogs from "./pages/Blogs";
import Blog from "./pages/Blog";

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="blog" element={<Blogs />} />
            <Route path="blog/:blogId" element={<Blog />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
