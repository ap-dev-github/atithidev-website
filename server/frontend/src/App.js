import LoginPanel from "./components/Login/Login"
import { Routes, Route } from "react-router-dom";
import RegisterPanel from "./components/Register/Register"
import Hosts from './components/Hosts/Hosts';
import Host from "./components/Hosts/Host"
import PostReview from "./components/Hosts/PostReview"

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPanel />} />
      <Route path="/register" element={<RegisterPanel />} />
      <Route path="/hosts" element={<Hosts/>} />
      <Route path="/host/:id" element={<Host/>} />
      <Route path="/postreview/:id" element={<PostReview/>} />
    </Routes>
  );
}
export default App;
