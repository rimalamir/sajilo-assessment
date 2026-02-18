# Mini Delivery App

A high-fidelity React Native (Expo) application for managing and tracking delivery requests, featuring offline support and real-time tracking simulation.

## Key Libraries Used

- **Expo**: Framework for React Native development and rapid prototyping.
- **React Navigation**: Standard library for handling screen transitions and application flow.
- **react-native-maps**: Used for the Tracking screen to visualize delivery routes.
- **AsyncStorage**: For persistent local storage of pending delivery requests.
- **NetInfo**: To monitor network connectivity and handle offline/online states.
- **Expo Vector Icons**: For consistent and high-quality iconography throughout the app.

## Key Technical Decisions

### 1. State Management: React Context API
The **React Context API** was chosen for state management over more complex solutions like Redux or Zustand. For a project of this scope, where the primary state consists of a list of orders shared across multiple screens, Context provides a clean, built-in solution that minimizes boilerplate while ensuring a single source of truth for the application state.

### 2. Data Storage: AsyncStorage
**AsyncStorage** was selected for local data persistence. It is a lightweight, asynchronous key-value storage system that is ideal for storing the localized JSON objects representing pending delivery requests. This ensures that even when a user creates a request while offline, it is safely stored and remains visible until a sync action occurs.

### 3. Navigation: Native Stack
We opted for `@react-navigation/native-stack` to leverage native platform primitives for screen transitions. This provides a more performant and "feel" consistent experience with the host OS (iOS/Android) compared to the JavaScript-based stack navigator.

## Getting Started

### Prerequisites
- Node.js (v18 or later)
- Expo Go app on your physical device or an emulator (iOS/Android)

### Installation
1. Clone the repository.
2. Run `npm install` to install dependencies.

### Running the App
- Start the Expo development server:
  ```bash
  npm start
  ```
- Use the QR code in the terminal to open the app in **Expo Go**.
