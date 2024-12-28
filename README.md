## ⭐ Introduction
Cinemate is a modern web application designed to provide users with a comprehensive movie browsing and management experience. It allows users to explore movies, manage their watchlists, and interact with movie-related content.

## 🟢 Features

- **Movie Exploration:** Browse and search through an extensive collection of movies
- **User Authentication:** Secure user authentication and authorization system
- **Personalized Experience:** Create and manage personal watchlists and favorites
- **Movie Details:** Access detailed information about movies including cast, ratings, and reviews
- **Responsive Design:** Seamless experience across desktop and mobile devices

## 🔧 Tech-Stack 

- **Frontend:**
  - React.js
  - Vite
  - TypeScript
  - Modern UI components
  - Telegram WebApp SDK

- **Backend:**
  - Go (Fiber framework)
  - RESTful API architecture
  - Telegram Bot API

- **Database:**
  - MongoDB

- **Other Tools:**
  - Docker
  - Environment-based configuration

## ▶️ Getting Started

To get a local copy up and running, please follow these simple steps.

### 🟡 Prerequisites

Here's what you need to be able to run the application locally:

- Node.js (Version: >=18.x)
- Go (Latest version)
- npm / yarn
- Docker (optional)
- Telegram Bot Token (Get it from [@BotFather](https://t.me/botfather))

### 🔐 Telegram Bot Setup

1. Create a new bot with [@BotFather](https://t.me/botfather)
2. Get your bot token
3. Enable the Web App feature for your bot:
   ```
   /mybots > Select your bot > Bot Settings > Web App Settings
   ```
4. Set your web app URL (in development, use ngrok or similar for HTTPS)

### 🟢 Environment Setup

1. Server Configuration (.env):
   ```env
   # Required
   TELEGRAM_BOT_TOKEN=your_bot_token_here
   ALLOWED_ORIGINS=http://localhost:5173

   # Database (if using)
   DB_HOST=localhost
   DB_USER=postgres
   DB_PASSWORD=your-password
   DB_NAME=cinemate
   DB_PORT=5432
   ```

2. Client Configuration (.env):
   ```env
   REACT_APP_API_BASE_URL=http://localhost:3001
   REACT_APP_TELEGRAM_BOT_USERNAME=your_bot_username
   ```

### 🟢 Setup (without Docker):

1. Clone the repo
   ```sh
   git clone [your-repository-url]
   ```

2. Go to the server directory
   ```sh
   cd server
   ```

3. Install Go dependencies
   ```sh
   go mod download
   ```

4. Set up your environment variables
   Create a `.env` file in the server directory with necessary configurations

5. Start the server
   ```sh
   go run main.go
   ```

6. In a new terminal, go to the client directory
   ```sh
   cd client
   ```

7. Install the client dependencies
   ```sh
   npm install
   ```

8. Set up client environment variables
   Create a `.env` file in the client directory with necessary configurations

9. Start the client
   ```sh
   npm run dev
   ```

The React app will be running on http://localhost:5173

## 🐋 Setup (with Docker):

1. Set up environment variables as described above

2. Run from the root directory:
   ```sh
   docker-compose up
   ```

The application will be available at http://localhost:5173

## ▶️ Preview

[Add screenshots or demo video of your application here]
