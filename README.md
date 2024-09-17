# Collaborative Whiteboard (Socket.io Project)

This is a learning project to demonstrate real-time communication using Socket.io. The project allows multiple users to collaborate on a shared whiteboard, where drawing actions are broadcast to all connected users in real time.

## Features

- Users can draw on a shared canvas.
- The whiteboard synchronizes across all connected clients.
- Customizable brush color and size for drawing.
- Responsive canvas that adapts to the screen size.

## Technologies Used

- **Frontend:** React, TypeScript, Vite
- **Backend:** Node.js, Socket.io
- **Styling:** CSS

## Installation and Setup

### Prerequisites

- Node.js (>=14.x)
- npm or yarn
- Vite (for development server)

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/collaborative-whiteboard.git
   ```

2. Install the dependencies for both the frontend and backend:

   **Frontend:**

   ```bash
   cd frontend
   npm install
   ```

   **Backend:**

   ```bash
   cd server
   npm install
   ```

3. Start the backend server:

   ```bash
   cd server
   node index.js
   ```

4. Start the frontend development server:

   ```bash
   cd frontend
   npm run dev
   ```

   The frontend will be available at (http://localhost:5173).

5. Open multiple browser tabs and interact with the whiteboard to see the real-time synchronization.

## Usage

- Users can draw on the canvas using different brush sizes and colors.
- The canvas is automatically synchronized between all connected users.
- The project is designed for learning purposes to understand how Socket.io can be used for real-time updates.

## Socket.io Events

- **canvasImage**: Broadcasts the current canvas drawing to all connected users.

## Contact

Mohamed Ramadan - MohamedRamadanSaudi@gmail.com
