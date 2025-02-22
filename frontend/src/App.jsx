import "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {Playlists} from "./Playlists";
import {Login} from "./Login";
import {Home} from "./Home";

function App() {
  return (
      <Router>
        <Routes>
            <Route path="/" element={<Home />} />
          <Route path="/Playlists" element={<Playlists />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
  );
}

export default App;