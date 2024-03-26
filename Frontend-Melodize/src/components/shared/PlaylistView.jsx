import PlaylistCard from "./PlaylistCard";

const PlaylistView = ({ title, cardData }) => {
  return (
    <div className="text-white mb-20">
      <div className="font-semibold text-2xl mb-2 border-b-2 border-gray-500 pb-2">
        {title}
      </div>
      <div className="w-full grid grid-cols-5 gap-4 mt-4 max-[1024px]:grid-cols-3">
        {cardData.map((element, index) => {
          return (
            <PlaylistCard
              title={element.title}
              description={element.description}
              url={element.url}
              key={index}
            />
          );
        })}
      </div>
    </div>
  );
};
export default PlaylistView;
