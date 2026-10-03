# LeadSync

A React Native mobile application that receives and displays Meta lead data in real time.

This project was developed as part of the Software Engineer Intern assignment for UnQue Cloudbook.

## Overview

LeadSync connects a React Native mobile application with a Node.js backend to receive and display leads generated through Meta's Lead Testing Tool.

The backend handles incoming lead data and communicates with the mobile application using Socket.IO. When a new lead is received, it is pushed to the connected mobile application and displayed in the leads list without requiring any manual refresh or interaction.

## Architecture

```text
                    Meta Lead Testing Tool
                              |
                              | Lead data
                              v
                    +-------------------+
                    |   Node.js Backend |
                    |      Express      |
                    +-------------------+
                              |
                       Lead processing
                              |
                              v
                         Socket.IO
                              |
                    Real-time connection
                              |
                              v
                 +----------------------+
                 |   React Native App   |
                 |                      |
                 |     Leads List       |
                 +----------------------+
```

## How It Works

1. A test lead is submitted using Meta's Lead Testing Tool.
2. The backend receives the lead data through the Meta integration.
3. The backend processes the incoming lead.
4. The processed lead is emitted to connected clients using Socket.IO.
5. The React Native application receives the lead in real time.
6. The new lead is added to the leads list without requiring any interaction with the mobile device.

## Technology Stack

### Mobile Application

* React Native
* Expo
* Expo Router
* JavaScript
* Socket.IO Client
* CSS / JavaScript-based styling

### Backend

* Node.js
* Express.js
* Socket.IO
* JavaScript

### Integration

* Meta Lead Testing Tool
* Meta Lead data integration

## Project Structure

```text
LeadSync/
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   └── webhookController.js
│   │   ├── routes/
│   │   │   └── webhookRoutes.js
│   │   ├── services/
│   │   │   ├── leadService.js
│   │   │   └── pollService.js
│   │   ├── socket/
│   │   │   └── socket.js
│   │   └── server.js
│   │
│   ├── package.json
│   └── package-lock.json
│
├── mobile/
│   ├── src/
│   │   ├── app/
│   │   │   └── layout.jsx
│   │   ├── styles/
│   │   │   └── leadStyles.js
│   │   └── global.css
│   │
│   └── package.json
│
├── .gitignore
└── README.md
```

## Backend Architecture

The backend is organized into separate layers for better maintainability.

### Controllers

The controller layer handles incoming requests and coordinates the processing of lead-related data.

### Routes

The route layer defines the backend endpoints used for the lead integration.

### Services

The service layer contains the lead-processing logic.

* `leadService.js` handles lead-related processing.
* `pollService.js` handles the polling-related functionality used by the application.

### Socket Layer

`socket.js` manages the Socket.IO connection between the backend and the React Native application.

When a new lead is available, the backend emits the lead data to connected clients.

## Real-Time Communication

Socket.IO is used to provide real-time communication between the backend and mobile application.

The flow is:

```text
New Lead
   |
   v
Backend receives/processes lead
   |
   v
Socket.IO emit
   |
   v
React Native Socket.IO client
   |
   v
Leads List updates
```

This allows a newly received lead to appear in the application without manually refreshing the screen.

## Lead Data

The application handles lead information such as:

* Name
* Email
* Phone number
* Lead ID
* Lead generation ID
* Created time

## Mobile Application

The mobile application provides a leads list interface where received leads are displayed.

The application establishes a Socket.IO connection with the backend. When a new lead event is received, the application updates the list accordingly.

## Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Tanusrikrishna/LeadSync.git
cd LeadSync
```

### 2. Install Backend Dependencies

```bash
cd backend
npm install
```

### 3. Start the Backend

```bash
npm start
```

Use the backend start command configured in `backend/package.json`.

### 4. Install Mobile Dependencies

Open another terminal:

```bash
cd mobile
npm install
```

### 5. Start the Expo Application

```bash
npx expo start
```

The application can then be opened on a connected Android device or emulator.

## Environment Configuration

Environment-specific values such as backend URLs, Meta credentials, access tokens, or other sensitive configuration should be provided through environment variables.

Sensitive credentials are not included in this repository.

## Assumptions

* The Meta Lead Testing Tool is used to generate test leads.
* The backend and mobile application are running and reachable during the demonstration.
* The mobile application has an active Socket.IO connection with the backend.
* Required Meta configuration and credentials are provided through environment variables.
* The application is intended to demonstrate real-time lead reception and display.






