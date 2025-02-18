Demo video: https://youtu.be/NOtr9tdqkus

# CampuSwap

## Overview
CampuSwap is a **full-stack web application** that enables university students to **trade and exchange items** in a secure and seamless manner. It leverages **GraphQL APIs**, **containerized microservices**, and **cloud storage** to deliver a highly scalable and performant trading platform. It's a pet project that I wanted to use as an opportunity to practice and solidify my understanding of Docker, Kubernetes, Nginx, GraphQL, MongoDB, and Vue.js.

## Key Features & Scalability Considerations

- **GraphQL API** enables efficient, flexible data fetching.
- **Microservices-oriented Kubernetes deployment** ensures horizontal scalability.
- **Dockerized development** for consistent environment replication.
- **Session-based authentication** balances security and usability.
- File uploads backed by **Google Cloud Storage** provide scalable media hosting.
- **Load balancing** ensures traffic distribution across services, preventing bottlenecks and improving fault tolerance.

## Tech Stack
### Infrastructure & DevOps:
- **Kubernetes (K8s)**: Container orchestration for auto-scaling and fault tolerance, exposing backend and frontend for external access via NodePorts
- **MongoDB ClusterIP Service**: Internal database communication.
- **Docker**: Containerized deployment for reproducible builds.
- **Google Cloud Storage**: Secure and scalable media storage.
- **Load Balancing**: Nginx reverse proxy distributes traffic efficiently between frontend and backend services, reducing bottlenecks and enhancing scalability.

### Backend:
- **Node.js & Express.js**: High-performance server-side framework.
- **GraphQL with Apollo Server**: Efficient data querying and manipulation.
- **MongoDB with Mongoose**: NoSQL database for flexible data modeling.
- **Passport.js (Local Strategy)**: Secure authentication with session-based login.
- **Multer & Google Cloud Storage**: File uploads with public hosting.
- **Pino Logger**: Structured logging for debugging and monitoring.
- **Dockerized & Kubernetes Orchestration**: Scalable microservices deployment.

### Frontend:
- **Vue.js with Vite**: Reactive and performant single-page application.
- **BootstrapVue**: Responsive UI components.
- **Vue Apollo**: Optimized client-side caching and declarative data fetching.
- **TypeScript**: Strongly typed components for maintainability.
- **Nginx Reverse Proxy**: Efficient static file serving and API routing.

## Backend Architecture
### **GraphQL API**
The backend exposes a **GraphQL API** built with **Apollo Server**, featuring:
- **User Authentication & Authorization**:
  - User registration with **bcrypt password hashing**.
  - Email verification via **Nodemailer**.
  - Session-based authentication using **Passport.js**.
- **Item Management**:
  - CRUD operations on items stored in **MongoDB**.
  - Image uploads handled via **Multer & Google Cloud Storage**.
- **Trade Requests**:
  - Securely send and accept trade requests.
  - Auto-resolve transactions upon acceptance by deleting exchanged items.
- **Logging & Error Handling**:
  - **Pino Logger** for structured application monitoring.
  - Custom error handling for authentication and data validation.

## Frontend Architecture
### **Vue.js + TypeScript SPA**
- **State Management**: Apollo Client manages GraphQL state efficiently through client-side caching and declarative data fetching.
- **Authentication Flow**:
  - Users login via a session-based system.
  - Protected routes enforce authentication checks.

## Kubernetes Deployment
The application is containerized and deployed on a **Kubernetes cluster**, with the following services:

### **Frontend (UI) Service**
- **NodePort Service** exposing Vue.js app
- **Nginx Reverse Proxy** for static file serving and API routing.
- **Environment Variables** for dynamic GraphQL endpoint configuration.

### **Backend (Server) Service**
- **Node.js Express Server** exposed via Nodeport
- **MongoDB Connection via ClusterIP Service** for internal communication.

### **Database (MongoDB) Service**
- **ClusterIP Service** ensuring internal-only database access.
- **Single-replica Deployment** for persistent data storage.


