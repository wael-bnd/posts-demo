# 📱 PostsDemo - React Native Development Test

A mobile application developed with **React Native** and **TypeScript** following **Test-Driven Development (TDD)** principles. The project demonstrates skills in mobile app development, API integration, pagination, search functionality, background tasks, and in-app storage.

---

## 📝 Table of Contents

1. [Task Overview](#task-overview)
2. [Setup & Installation](#setup-and-installation)
3. [Available Scripts](#available-scripts)
4. [Project Structure](#project-structure)
5. [API Details](#-api-details)
6. [Technologies](#-technologies)
7. [Testing](#-testing)
8. [Debugging](#-debugging)

---

## Task Overview

### Objective

Build a mobile app using React Native and TDD principles to demonstrate your skills in app development.

### Requirements

1. **Login Screen**: Users can authenticate with a username and password.
2. **Home Screen**: Displays a welcome message and a list of posts fetched from a mock API.
3. **Logout Functionality**: Allows users to log out and return to the login screen.
4. **Posts List**: Displays post details with pagination and search functionality.
5. **Post Details Screen**: Shows additional details about each selected post.
6. **User Activity Logger**: Logs user actions (login, search, post selection) in-app storage and sends them as JSON on app background/close.
7. **Unit Testing**: Develop using TDD principles, covering key functionalities.

---

## Setup and Installation

### Prerequisites

- **Node.js** version 18 or above
- **React Native CLI**

### Installation Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/wael-bnd/posts-demo
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Navigate to the iOS directory and install CocoaPods:

```bash
cd ios
pod install
cd ..
```

4. Run the app on Android:
   ```bash
   npm run android
   ```
5. Run the app on iOS:
   ```bash
   npm run ios
   ```
6. To start the development server:
   ```bash
   npm run start
   ```

---

## Available Scripts

- **npm run android**: Runs the app on an Android device/emulator.
- **npm run ios**: Runs the app on an iOS simulator.
- **npm run lint**: Lints the project files using ESLint.
- **npm run start**: Starts the React Native server.
- **npm run test**: Runs the Jest test suite.

---

## Project Structure

```
PostsDemo/
├── src/
│   ├── api/                # Contains API call functions
│   ├── enum/               # Enumerations used throughout the app
│   ├── navigation/         # Navigation setup for the app
│   ├── redux/              # Redux store and slices
│   ├── screens/            # App screens (Login, Home, PostDetail)
│   ├── services/           # Service functions for API calls and logic
│   └── types/              # TypeScript types and interfaces
├── App.tsx                 # Entry point
└── README.md               # Project documentation
```

---

## 💻 Technologies

- Core: React Native, TypeScript
- State Management: Redux, Redux Persist, Redux Toolkit
- UI: React Native Paper, React Navigation
- Network: Axios
- Testing: Jest, React Testing Library, TDD principles
- Debugging: Reactotron (for monitoring and debugging API calls and Redux state) """

---

## 🌐 API Details

1. **Login Endpoint**
   - URL: `https://dummyjson.com/auth/login`
   - Method: `POST`
2. **Posts Endpoint**
   - URL: `https://dummyjson.com/posts`
   - Method: `GET`
3. **Users Endpoint**
   - URL: `https://dummyjson.com/users/[id]`
   - Method: `GET`
4. **Image URL**
   - URL: `https://picsum.photos/seed/[id]/[width]/[height]`
5. **Search Endpoint**
   - URL: `https://dummyjson.com/posts/search?q=[query]`
   - Method: `GET`
6. **Log Endpoint**
   - URL: `https://dummyjson.com/http/200`
   - Method: `POST`

---

## 🧪 Testing

The application is built using TDD principles. Key layers have unit tests implemented using Jest and React Testing Library.

### Run Tests:

```bash
npm test
```

### Tested Scenarios

- Authentication validation (Login and Logout)
- API calls for fetching posts and user details
- Navigation between screens
- Action logging and storage in app storage

---

## 🐛 Debugging

The project uses Reactotron to help monitor Redux state changes, network requests, and logged actions. Reactotron provides real-time feedback, making it easier to troubleshoot and debug the application.

### Setup Reactotron

To use Reactotron, ensure that the Reactotron desktop app is running, and the device/emulator is connected.

1. **Install Reactotron**:

   - Download and install the Reactotron app from the [official site](https://infinite.red/reactotron).

2. **Start the Reactotron app** and connect your device or emulator.

3. **Configure Reactotron in the project**:
   - Check `/src/config/ReactotronConfig.ts` for custom configurations.
