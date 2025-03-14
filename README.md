# 🎧 Melodize

Melodize is a full-stack web application built using the **MERN (MongoDB, Express.js, React.js, Node.js) stack**. This application provides users with an intuitive platform to **discover, listen to, and manage** their favorite music seamlessly. Similar to popular music streaming services like Spotify, Melodize offers a **rich user experience** with features including user authentication, playlist creation, song browsing, and playback functionality.

## ✨ Features

- 🔐 **User Authentication**: Secure account creation and login.
- 🎼 **Browse Music**: Explore a vast library of songs, albums, and artists.
- 🔍 **Search Functionality**: Quickly find songs, albums, or artists.
- 📂 **Create Playlists**: Organize your favorite songs with custom playlists.
- 🎛️ **Playback Controls**: Play, pause, skip, replay, and autoplay music.
- 📱 **Responsive Design**: Optimized for desktops, tablets, and mobile devices.
- ☁️ **Cloudinary Integration**: Store and manage images & media files efficiently.

## 🚀 Technologies Used

- **MongoDB** 🍃 - NoSQL database for storing user data, music metadata, and playlists.
- **Express.js** ⚡ - Backend framework for building robust APIs.
- **React.js** ⚛️ - JavaScript library for building interactive UI components.
- **Node.js** 🟢 - JavaScript runtime environment for executing server-side logic.
- **Cloudinary** ☁️ - Cloud-based storage for handling music cover images and user-uploaded media.
- **JWT Authentication** 🔑 - Secure authentication and authorization using JSON Web Tokens.
- **HTML/CSS** 🎨 - Structure and styling for an engaging user interface.
- **Tailwind CSS** 💨 - Utility-first framework for rapid UI design.

## ⚙️ Pre-Requisites

- **Cloudinary Account**: Ensure you have a **Cloudinary** account set up and retrieve your `cloud_name` and `upload_preset`.

## 📥 Installation

### 1️⃣ Clone the repository

```bash
git clone https://github.com/D-pixel-crime/Project-Melodize.git
```

### 2️⃣ Navigate to the project directory

```bash
cd "Project Melodize"
```

### 3️⃣ Install dependencies for both frontend and backend

```bash
cd Frontend-Melodize
npm install
cd ../Backend-Melodize
npm install
```

### 4️⃣ Configure environment variables

- Create a `.env` file for both Backend and Frontend.
- **Backend (`Backend-Melodize/.env`)**:
  ```ini
  MONGO_URI=your_mongo_connection_string
  JWT_SECRET=your_jwt_secret_to_cook_tokens
  ```
- **Frontend (`Frontend-Melodize/.env`)**:
  ```ini
  VITE_BACKEND_URI=your_backend_server_url
  VITE_CLOUDINARY_UPLOAD_PRESET=your_cloudinary_upload_preset
  VITE_CLOUDINARY_CLOUDNAME=your_cloudinary_cloud_name
  ```

### 5️⃣ Start the backend server

```bash
cd Backend-Melodize
node index.js
```

### 6️⃣ Start the frontend client

```bash
cd Frontend-Melodize
npm run dev
```

### 7️⃣ Access the application

Visit 👉 `http://localhost:5173` in your web browser. 🚀🎶

