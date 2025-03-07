import {AuthContext} from "../contexts/AuthContext.jsx";
import {useContext} from "react";

export default function Navbar({pfp, name}){

    const { logout } = useContext(AuthContext);

    return (
        <div className="navbar bg-black shadow-sm">
            <div className="flex-1">

                <a className="btn btn-ghost text-xl text-[#1ed760] items-center justify-center">Spotimap</a>
            </div>
            <div className="flex gap-2">
                <p className="flex text-[#1ed760]">{name}</p>
                <div className="dropdown dropdown-end">
                    <div tabIndex="0" role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img
                                alt="Tailwind CSS Navbar component"
                                src={pfp}/>
                        </div>
                    </div>
                    <ul
                        tabIndex="0"
                        className="menu menu-sm dropdown-content bg-black rounded-box z-1 mt-3 w-52 p-2 shadow text-white">
                        <li>
                            <button className="btn btn-ghost w-full" onClick={logout}>Logout </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}