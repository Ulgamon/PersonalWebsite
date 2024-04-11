import { BrowserRouter, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import { ThemeProvider } from "./context/theme-provider.tsx";
const Home = lazy(() => import("./pages/Home.tsx"));
const Blogs = lazy(() => import("./pages/Blogs.tsx"));
const Blog = lazy(() => import("./pages/Blog.tsx"));
const NotFound = lazy(() => import("./pages/NotFound.tsx"));
import ScrollToTop from "./helpers/ScrollToTop.tsx";
import Loading from "./pages/Loading.tsx";

function App() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <BrowserRouter>
        <ScrollToTop>
          <Routes>
            <Route path="/">
              <Route
                index
                element={
                  <Suspense fallback={<Loading />}>
                    <Home />
                  </Suspense>
                }
              />
              <Route
                path="blog"
                element={
                  <Suspense fallback={<Loading />}>
                    <Blogs />
                  </Suspense>
                }
              />
              <Route
                path="blog/:blogId"
                element={
                  <Suspense fallback={<Loading />}>
                    <Blog />
                  </Suspense>
                }
              />
            </Route>
            <Route
              path="*"
              element={
                <Suspense fallback={<Loading />}>
                  <NotFound />
                </Suspense>
              }
            />
          </Routes>
        </ScrollToTop>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
