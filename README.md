# Melodize

Melodize is a full-stack web application built using the MERN (MongoDB, Express.js, React.js, Node.js) stack. This application provides users with an intuitive platform to discover, listen to, and manage their favorite music seamlessly. Similar to popular music streaming services like Spotify, MusicApp offers a rich user experience with features including user authentication, playlist creation, song browsing, and playback functionality.

## Features

- **User Authentication**: Users can create accounts securely and log in to access personalized features.
- **Browse Music**: Explore a vast library of songs, albums, and artists.
- **Search Functionality**: Quickly find desired songs, albums, or artists using the search feature.
- **Create Playlists**: Users can create custom playlists to organize their favorite songs.
- **Playback Controls**: Play, pause, forward, backward, loop, autoplay while listening to music.
- **Responsive Design**: The application is optimized for various devices, including desktops, tablets, and mobile phones.

## Technologies Used

- **MongoDB**: NoSQL database used for storing user data, music metadata, and playlists.
- **Express.js**: Web application framework for building robust APIs and handling HTTP requests.
- **React.js**: JavaScript library for building dynamic user interfaces.
- **Node.js**: JavaScript runtime environment for executing server-side code.
- **JWT Authentication**: JSON Web Tokens used for secure user authentication and authorization.
- **HTML/CSS**: Markup language and styling for creating engaging user interfaces.
- **Tailwind CSS**: A utility-first CSS framework for rapidly building custom designs without the need for writing traditional CSS.

## Installation

1. Clone the repository:

```
git clone https://github.com/D-pixel-crime/Project-Melodize.git
```

2. Navigate to the project directory:

```
cd "Project Melodize"
```

3. Install dependencies for both the client and server:

```
cd Frontend-Melodize
npm install
cd ../Backend-Melodize
npm install
```

4. Configure environment variables:

   - Create a `.env` file.
   - Define environment variables including MongoDB pass etc.

5. Start the server:

```
cd Backend-Melodize
node index.js
```

6. Start the client:

```
cd Frontend-Melodize
npm run dev
```

7. Access the application by visiting `http://localhost:5173` in your web browser.
