# BizBridge 🚀  
Bridge Between Investors and Business People

## 📌 Overview
BizBridge is a web-based platform designed to bridge the gap between investors and business people by providing a common digital space for collaboration.  
The application enables multiple user roles such as Investors, Entrepreneurs, Bankers, and Business Advisors to interact through role-based dashboards.

The project is built as a **Single Page Application (SPA)** using **React** and **Firebase**, focusing on scalability, security, and modular design.

---

## 🎯 Objectives
- Connect investors and entrepreneurs on a unified platform
- Enable secure authentication and role-based access
- Allow entrepreneurs to post business ideas
- Allow investors to view and post investment proposals
- Support advisory and banking assistance
- Demonstrate clean system architecture and low-level design

---

## 👥 User Roles
- **Entrepreneur**
- **Investor**
- **Banker**
- **Business Advisor**

Each role has a dedicated dashboard and controlled access to features.

---

## 🛠️ Technology Stack
- **Frontend:** React.js, JavaScript (ES6), HTML5, CSS3
- **Routing:** React Router DOM
- **State Management:** React Context API
- **Backend:** Firebase (Backend-as-a-Service)
- **Authentication:** Firebase Authentication
- **Database:** Firestore (NoSQL)
- **Version Control:** Git & GitHub

---

## 🧩 System Architecture
BizBridge follows a client-side SPA architecture where:
- React handles UI rendering and routing
- Firebase Authentication manages user login and sessions
- Firestore stores application data securely
- Role-based access is enforced using protected routes

---

## 🧠 Low Level Design (LLD)
- Modular React components
- Centralized authentication using Context API
- Protected routes for role-based access
- Firebase service layer abstracts database logic
- Clean separation between UI, logic, and data layers

---

## 🔒 Security Features
- Firebase Authentication for secure login
- Firestore security rules
- Role-based route protection
- No sensitive credentials stored in source code

---

## 🧪 Testing
Manual functional testing was performed for:
- User registration and login
- Role-based routing
- Data creation and retrieval
- Unauthorized access handling

---

## 📂 Project Setup
```bash
npm install
npm run dev

---

## 👤 Author
**Prajyot Ghosalkar**

---
