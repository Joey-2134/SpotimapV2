import {useNavigate} from "react-router-dom";

const PlaylistCard = ({ imgUrl, playlistName, id }) => {
    const navigate = useNavigate();

    return (
        <button className="flex flex-col items-center bg-neutral-700 p-4 rounded-lg shadow-md"
            onClick={() => {
                navigate(`/map?playlistId=${id}`);
            }}
        >
            <img
                src={imgUrl}
                alt={`${playlistName} cover`}
                className="w-32 h-32 rounded-lg object-cover"
            />
            <p className="mt-2 text-center font-medium text-white">{playlistName}</p>
        </button>
    );
};

export default PlaylistCard;