const PlaylistCard = ({ title, description, url }) => {
  return (
    <div className="card p-4 text-sm rounded-lg flex justify-between flex-col">
      <div
        className="card-image mb-2 text-transparent rounded-md"
        style={{
          backgroundImage: `url(${url})`,
        }}
      ></div>
      <div>
        <div className="text-white">{title}</div>
        <div className="text-gray-400">{description}</div>
      </div>
    </div>
  );
};
export default PlaylistCard;
