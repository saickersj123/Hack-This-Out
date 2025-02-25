# 🛡️ Hack This Out

<div align="center">
  <img src="frontend/src/assets/img/icon/HTO ICON DARK RECOLORED_crop_fill.png" alt="Hack This Out Logo" width="200"/>
  <p><em>Master cybersecurity through hands-on practice in a controlled environment</em></p>
</div>

## 🔍 Overview

Hack This Out is a comprehensive cybersecurity training platform that provides hands-on experience with penetration testing and ethical hacking. The platform allows users to practice their cybersecurity skills on virtual machines hosted in the cloud, participate in time-limited contests, and track their progress as they develop their skills.

## ✨ Features

### 👨‍💻 For Users
- **🖥️ Virtual Machine Access**: Launch and interact with vulnerable machines hosted on AWS EC2
- **🔒 VPN Connection**: Secure access to practice environments via OpenVPN
- **📈 Skill Progression**: Earn experience points (EXP) by solving challenges and level up
- **💡 Hint System**: Get help when stuck with a progressive hint system
- **🏆 Contests**: Participate in time-limited hacking competitions
- **🏅 Leaderboards**: Compare your skills with other users

### 👨‍🔧 For Administrators
- **⚙️ Machine Management**: Create, update, and manage vulnerable machine templates
- **📅 Contest Creation**: Set up and schedule hacking competitions
- **👥 User Management**: Monitor user progress and manage permissions
- **📊 Instance Monitoring**: Track and manage active EC2 instances
- **📉 Analytics**: View platform usage statistics and user performance

## 🛠️ Technical Stack

### Backend
- **Node.js** with **Express** framework
- **TypeScript** for type safety
- **MongoDB** with **Mongoose** for data storage
- **JWT** for authentication
- **AWS SDK** for EC2 instance management and S3 storage
- **bcrypt** for password hashing
- **node-cron** for scheduled tasks

### Frontend
- **React** with **TypeScript**
- **Material UI** for component styling
- **React Router** for navigation
- **Axios** for API requests
- **i18next** for internationalization
- **SCSS** for custom styling

## 🏗️ Architecture

The application follows a client-server architecture:

1. **Frontend**: React-based SPA that communicates with the backend API
2. **Backend API**: Express server that handles business logic and database operations
3. **AWS Integration**: Manages EC2 instances for vulnerable machines
4. **MongoDB Database**: Stores user data, machine templates, and contest information

## 🔐 Security Features

- Secure authentication with JWT tokens
- Password hashing with bcrypt
- Rate limiting to prevent brute force attacks
- Input validation and sanitization
- CORS protection
- HTTP-only cookies for token storage
- Secure VPN access to vulnerable machines

## 🚀 Getting Started

### Prerequisites
- Node.js (v16+)
- MongoDB
- AWS account with appropriate permissions
- OpenVPN server

### Environment Setup

#### Backend
Create a `.env` file in the backend directory with the following variables:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
COOKIE_SECRET=your_cookie_secret
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_REGION=your_aws_region
AWS_SECURITY_GROUP_ID=your_security_group_id
AWS_S3_BUCKET_NAME=your_s3_bucket_name
AWS_KEY_NAME=your_key_name
ADMIN_PASSWORD=your_admin_password
VPN_SERVER_IP=your_vpn_server_ip
ORIGIN_URL=http://localhost:3000
DOMAIN:.window.location.hostname
MODE=development
```

#### Frontend
Create a `.env` file in the frontend directory with the following variables:

```
VITE_API_URL=http://localhost:5000/api
```

### Installation

1. Clone the repository
```bash
git clone https://github.com/saickersj123/hackthisout.git
cd hackthisout
```

2. Install backend dependencies
```bash
cd backend
npm install
```

3. Install frontend dependencies
```bash
cd frontend
npm install
```

### Running the Application

1. Start the backend server
```bash
cd backend
npm run dev
```

2. Start the frontend development server
```bash
cd frontend
npm run dev
```

## 📱 Key Features in Detail

### Machine Management
- Create vulnerable machines with custom configurations
- Set difficulty levels and experience points
- Manage machine availability and status

### Contest System
- Create time-limited hacking competitions
- Set up machine pools for contests
- Track participant progress and rankings

### User Progression
- Experience-based leveling system

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Thanks to all contributors who have helped build this platform
- Inspired by popular cybersecurity training platforms like HackTheBox and TryHackMe

<div align="center">
  <p>Made with ❤️ for the cybersecurity community</p>
</div>