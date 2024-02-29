import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<>HAHAHAHAH</>} />
            <Route path="blog/:blogId" element={<>Blog With ID</>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
