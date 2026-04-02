# Listify - Grocery List Manager (Yelim Lee N12278491)

This project was developed as part of IFN636 Software Life Cycle Management.

Listify is a full-stack web application that allows users to manage grocery lists efficiently.
Users can create, view, update, and delete grocery items.
The system includes secure user authentication and supports category management for better organization.

## Live Demo

Public URL:  
http://13.211.74.49

## Features

- User Registration and Login (Authentication)
- Create, Read, Update, Delete (CRUD) Grocery Items
- Category Selection for Items
- Mark Items as Completed
- Authentication using JWT

## Demo Account

You can use the following demo account to test the application with pre-populated grocery list data:

- Username: user1
- Password: user1234

This account already contains sample grocery items to help demonstrate the core functionality of the system.

## Tech Stack

- Frontend: React
- Backend: Node.js, Express
- Database: MongoDB
- Deployment: AWS EC2
- Process Manager: PM2
- Web Server: Nginx
- CI/CD: GitHub Actions

## System Architecture

- Frontend is built using React and served via Nginx
- Backend is built with Express and runs on port 5001
- MongoDB is used for data storage
- PM2 is used to keep backend running
- GitHub Actions automates testing and build

## Design Approach

The application adopts a mobile-first design approach, focusing on simplicity, accessibility, and efficient user interaction.  
This ensures that users can quickly manage their grocery lists in real-world scenarios, even on smaller devices.

## Installation

### Clone the repository

```bash
git clone https://github.com/dPfal/listify
cd listify
```

### Backend Setup

```bash
cd backend
npm install
```

### Environment Setup

Create a `.env` file in the backend directory based on the `.env.example` file:

```bash
cp .env.example .env
```

### Run Backend

```bash
npm run dev
```

### Frontend Setup

```bash
cd ../frontend
npm install
npm run dev
```

### Deployment

```bash
pm2 start index.js --name backend
pm2 save
pm2 startup
```
