import { useEffect, useState } from "react";
import axios from "axios";

function App() {
    const [user, setUser] = useState(null);


    if (!user) return <p>Loading...</p>;

    return (
        <div>
            <h1>Welcome, {user.displayName}!</h1>
            <img src={user.pfp} alt="Profile" />
        </div>
    );
}

export default App;
