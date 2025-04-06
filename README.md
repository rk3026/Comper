# Comper  
An anonymous, privacy-focused hobby forum. Visit us at: [https://comper.space](https://comper.space)

![image](https://github.com/user-attachments/assets/80557ee2-25e5-48b3-bab0-49e703fd34ca)


**Developers:**  
Ross Kugler — [GitHub](https://github.com/rk3026)  
Huy (Harry) Ky — [GitHub](https://github.com/Harry908)  
Dylan Gyori — [GitHub](https://github.com/JustDylan)  
Linh (Jason) Nguyen — [GitHub](https://github.com/linhnt-98)  
Evan Gyori — [GitHub](https://github.com/EvanGyori)  
Ben Bordon — [GitHub](https://github.com/wizkid0101)  

## Overview
Comper is a platform where users can participate in anonymous discussions, submit entries to competitions, and engage in hobby-related forums. The app prioritizes privacy and user control over their personal data. It supports anonymous posts and competitions, creating a space where people can share and explore ideas without the fear of being tracked or identified.

## Features
- **Anonymous User Engagement**: No account required to post or participate.
- **Privacy-Focused**: Protects user data and keeps participation anonymous.
- **Hobby Forums**: Threads for various hobbies, where users can discuss, share tips, and exchange ideas.
- **Competitions**: Users can submit entries to anonymous competitions and vote on them.

## 🛠️ Tools Used
- [Node.js](https://nodejs.org/) – runtime for the backend  
- [React](https://react.dev/) – frontend UI library  
- [Express.js](https://expressjs.com/) – Node.js web framework  
- [Azure SQL](https://azure.microsoft.com/en-us/products/azure-sql/database) – storing threads & posts  
- [Render](https://render.com/) – hosting platform for backend and frontend  

## Project Structure

### Backend
The backend is built using Node.js and Express. It handles API requests, manages user submissions, and interacts with the Azure SQL database.

#### Key Files:
- `server.js`: The entry point of the backend server.
- `routes/`: Contains route files for handling API requests (competitions, threads, comments, etc.).
- `db/`: Contains database connection setup (connection pools).
- `Controllers/`: Used to control queries for specific data models.
- `Models/`: Interact directly with the Azure SQL server for data in the tables.

### Frontend
The frontend is built using React, and it communicates with the backend API to display threads, competitions, and user-submitted competition entries.

#### Key Files:
- `src/App.js`: The main React component, rendering the entire app interface.
- `src/components/`: Contains React components used across the app (e.g., forms, thread listings).
- `src/utils/`: Utility functions to handle API requests.
- `src/pages/`: Sections of the site that display data and allow user interaction.

### Hosting Platform
We host our backend and frontend on Render. The frontend uses the static site option, and the backend uses the web service option.

### Database

![image](https://github.com/user-attachments/assets/3a617098-b4e9-40a8-82d4-24f0f879face)
