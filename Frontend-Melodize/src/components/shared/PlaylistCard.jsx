const PlaylistCard = ({ title, description, url }) => {
  return (
    <div className="card max-sm:mx-5 max-sm:py-6 p-4 text-sm rounded-lg flex justify-between flex-col max-sm:flex-center">
      <div
        className="card-image mb-2 text-transparent rounded-md max-[768px]:size-40"
        style={{
          backgroundImage: `url(${url})`,
        }}
      ></div>
      <div>
        <div className="text-white max-sm:text-center">{title}</div>
        <div className="text-gray-400 max-sm:text-justify">{description}</div>
      </div>
    </div>
  );
};
export default PlaylistCard;
