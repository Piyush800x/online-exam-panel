# Online Exam Panel

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

An online platform for conducting secure and efficient exams for educational institutions. This application allows institutes to manage exams and students to participate in them, ensuring data security and integrity throughout the process.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Student and Institute Login**: Secure login system for both students and institutes using Kinde.
- **Institute Question Upload**: Allows institutes to upload and manage exam questions securely.
- **Security**: Ensures that answer keys and sensitive information are not accessible from the frontend.
- **Database Management**: Efficient storage and retrieval of questions, answers, and user data using MongoDB.
- **Responsive Design**: Built with Tailwind CSS for a mobile-friendly user interface.

## Technologies Used

- **Frontend**: React.js, Tailwind CSS
- **Backend**: Node.js, Next.js
- **Database**: MongoDB
- **Authentication**: KindeAuth
- **Version Control**: Git and GitHub

## Getting Started

To get a local copy of the project up and running, follow these steps:

### Prerequisites

Make sure you have the following installed on your local machine:

- **Node.js** (v14 or above)
- **npm** (v6 or above)
- **MongoDB** (running locally or use a MongoDB Atlas cloud instance)

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/shibammitra24/online-exam-panel.git
   cd online-exam-panel
1. **Run the server**:

   ```bash
   npm run dev
