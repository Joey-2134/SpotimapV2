import "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {Playlists} from "./routes/Playlists.jsx";
import {Login} from "./routes/Login.jsx";
import {Home} from "./routes/Home.jsx";
import {AuthProvider} from "./contexts/AuthContext.jsx";
import {Callback} from "./routes/Callback.jsx";

function App() {
  return (
      <AuthProvider>
          <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/playlists" element={<Playlists />} />
                <Route path="/login" element={<Login />} />
                <Route path="/callback" element={<Callback />} />
                <Route path="/map" element={<Map />} />
            </Routes>
          </Router>
      </AuthProvider>
  );
}

export default App;