const PlaylistCard = ({ imgUrl, playlistName }) => {
    return (
        <div className="flex flex-col items-center bg-neutral-700 p-4 rounded-lg shadow-md">
            <img
                src={imgUrl}
                alt={`${playlistName} cover`}
                className="w-32 h-32 rounded-lg object-cover"
            />
            <p className="mt-2 text-center font-medium text-white">{playlistName}</p>
        </div>
    );
};

export default PlaylistCard;