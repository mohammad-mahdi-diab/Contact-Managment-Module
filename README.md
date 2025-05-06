# Contact Module Managment

A web application to manage your contacts

## Getting Started

Contact Module Managment uses the following technologies:

- Next.js
- React
- Tailwind CSS
- MongoDB
- Mongoose
- NextAuth.js
- React Icons
- React Spinners
- React Toastify

### Prerequisites
-   Node.js version 18 or higher
-   MongoDB Atlas account and a cluster. Sign up and create a cluster at [MongoDB](https://www.mongodb.com/)
-   Google console account. Sign up at [Google Cloud](https://console.cloud.google.com/)

### `.env` File

Rename .example file to .env and fill in the following environment variables:
- Get your MongoDB connection string from your MongoDB Atlas cluster and add it to MONGODB_URI.
- Get your Google client ID and secret from your Google console account and add them to GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET.
- Add a secret to NEXTAUTH_SECRET. You can generate with the following command: 

```
openssl rand -base64 32
```
### Install Dependencies
```
npm install
```
### Run the Development Server

```
npm run dev
```
Open http://localhost:3000.
