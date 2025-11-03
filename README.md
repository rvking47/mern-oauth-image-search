# 🖼️ Image Search App (MERN + OAuth)


A full-stack image search application built using **MERN Stack (MongoDB, Express, React, Node)** with **OAuth authentication** (Google, GitHub, Facebook).  
Users can search images from the **Unsplash API**, view top searches across all users, and manage their personal search history.

![img alt](https://github.com/rvking47/mern-oauth-image-search/blob/main/screenshot/images-search.png?raw=true)

## Important Note:
Facebook OAuth integration is not fully configured in this project because my Facebook Developer account is currently under verification, and I haven’t received access to the App ID and Secret yet.

## Project Screenshots

### OAuth Login
![OAuth Login](./screenshot/oauth-login.png)

### Top Searches Banner
![Top Searches](./screenshot/search.png)

### Search Results + Multi-Select
![Search Results](./screenshot/select.png)

### User Search History
![Search History](./screenshot/histroy.png)


## Features

**OAuth Authentication**
- Login using Google, GitHub, or Facebook (via Passport.js).  
- Only logged-in users can access the app.

**Image Search**
- Fetches high-quality images from the **Unsplash API**.
- Displays search results in a 4-column responsive grid.
- Shows “You searched for X – N results” message.

**Multi-Select Functionality**
- Users can select multiple images with checkboxes.
- Dynamic counter shows the number of selected images.

**Top Searches**
- Displays the top 5 most searched terms across all users.

**User Search History**
- Shows logged-in user’s previous searches with timestamps.

##  Tech Stack

| Layer | Technology |
|-------|-------------|
| Client | React.js, Axios, React Router |
| Server | Node.js, Express.js |
| Database | MongoDB (Mongoose) |
| Authentication | Passport.js (Google, GitHub, Facebook OAuth) |
| API | Unsplash API |



