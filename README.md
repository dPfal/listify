# Listify - Grocery List Manager (Yelim Lee N12278491)

This project was developed as part of IFN636 Software Life Cycle Management.

Listify is a full-stack web application that allows users to manage grocery lists efficiently.
Users can create, view, update, and delete grocery items.
The system includes secure user authentication and supports category management for better organization.

## Features

- User Registration and Login (Authentication)
- Create, Read, Update, Delete (CRUD) Grocery Items
- Category Selection for Items
- Mark Items as Completed
- Authentication using JWT

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

## Installation

Install dependencies for both frontend and backend:

### Backend
cd backend

npm install

### Frontend
cd frontend

npm install
