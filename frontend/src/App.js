import Footer from "./components/Footer";
import Header from "./components/Header";
import PostDetail from "./pages/PostDetail";
import PostList from "./pages/PostList";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CategoryPosts from './pages/categoryPosts';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<PostList />} />
          <Route path="/posts/:id" element={<PostDetail />} />
          <Route path="/posts/category/:id" element={<CategoryPosts />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
