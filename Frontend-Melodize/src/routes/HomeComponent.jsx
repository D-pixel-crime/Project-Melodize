import PlaylistView from "../components/shared/PlaylistView.jsx";
import CommonContainer from "../containers/CommonContainer.jsx";

const focusPlaylist = [
  {
    title: "Peaceful Piano",
    description: "Relax and indulge with beautiful piano pieces",
    url: "https://t3.ftcdn.net/jpg/03/35/35/44/360_F_335354449_fkBBxEzbetEFg2D9uqkmH3cHRAW6gqpC.jpg",
  },
  {
    title: "Deep Focus",
    description: "Keep calm and focus with this music",
    url: "https://media.npr.org/assets/img/2021/03/19/life-kit_focus-final_slide-a396278caa637a2c5caefc48f24e3a8e8cf3d015.jpg",
  },
  {
    title: "Instrumental study",
    description: "Focus with soft study music in the background",
    url: "https://m.media-amazon.com/images/I/61bk-N8K4-L._UXNaN_FMjpg_QL85_.jpg",
  },
  {
    title: "Focus Flow",
    description: "Up tempo instrumental hip hop beats",
    url: "https://resources.tidal.com/images/7156e041/3e33/4f26/b50a/c0bcbde934ad/640x640.jpg",
  },
  {
    title: "Beats to think to",
    description: "Focus with deep techno and tech house",
    url: "https://i.scdn.co/image/ab67616d0000b2732da49f9ecc8c48b83f7ce450",
  },
];

const HomeComponent = () => {
  return (
    <CommonContainer>
      <PlaylistView title={"Focus"} cardData={focusPlaylist} />
      <PlaylistView title={"Melodize Playlist"} cardData={focusPlaylist} />
    </CommonContainer>
  );
};
export default HomeComponent;
