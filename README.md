# 🌍 WanderLust

A full-stack travel listing web application where users can explore, create, edit, and review travel destinations.

WanderLust is built using the **MVC architecture** with Node.js, Express.js, MongoDB, and EJS.

---

## 🚀 Features

* 🔐 User Signup, Login & Logout
* 🏡 Create, Edit & Delete Listings
* 👤 User Authentication & Authorization
* ⭐ Add and Delete Reviews
* 🖼️ Image Upload using Cloudinary
* 🗺️ Location Maps using MapTiler
* 🔔 Flash Messages for Success & Errors
* ✅ Server-side Validation using Joi
* 🔒 Only Listing Owners Can Edit or Delete Listings
* 💬 Only Review Authors Can Delete Their Reviews
* 📱 Responsive User Interface

---

## 🛠️ Tech Stack

### Frontend

* HTML
* CSS
* JavaScript
* EJS
* Bootstrap

### Backend

* Node.js
* Express.js

### Database

* MongoDB
* Mongoose

### Authentication

* Passport.js
* Passport Local
* Passport Local Mongoose
* Express Session

### Other Services

* Cloudinary
* Multer
* MapTiler
* Joi

---

## 📁 Project Structure

```text
WanderLust/
│
├── controllers/
│   ├── listing.js
│   ├── review.js
│   └── user.js
│
├── init/
│   ├── data.js
│   └── index.js
│
├── models/
│   ├── listing.js
│   ├── review.js
│   └── user.js
│
├── public/
│   ├── css/
│   └── js/
│
├── routes/
│   ├── listings.js
│   ├── reviews.js
│   └── users.js
│
├── utils/
│   ├── ExpressError.js
│   └── wrapAsync.js
│
├── views/
│   ├── includes/
│   ├── layouts/
│   ├── listings/
│   ├── users/
│   └── error.ejs
│
├── app.js
├── cloudConfig.js
├── middleware.js
├── schema.js
├── package.json
└── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/YOUR-USERNAME/WanderLust.git
```

### 2️⃣ Navigate to the Project

```bash
cd WanderLust
```

### 3️⃣ Install Dependencies

```bash
npm install
```

### 4️⃣ Create Environment Variables

Create a `.env` file in the root directory:

```env
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_APIKEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret

MAPTILER=your_maptiler_api_key
```

> ⚠️ Never upload your `.env` file to GitHub.

### 5️⃣ Start MongoDB

Make sure MongoDB is running on your system.

### 6️⃣ Run the Application

```bash
node app.js
```

Open your browser and visit:

```text
http://localhost:8080
```

---

## 📸 Screenshots

You can add screenshots of your project here.

Example:

```md
![Home Page](./public/images/home.png)
```

---

## 🔐 Authentication & Authorization

WanderLust uses **Passport.js** for user authentication.

### Protected Actions

Users must log in to:

* Create a listing
* Edit a listing
* Delete a listing
* Add a review

### Authorization

* Only the **listing owner** can edit or delete their listing.
* Only the **review author** can delete their review.

---

## 🗺️ Map Integration

WanderLust uses **MapTiler** to display maps for travel listings.

Each listing can display its location on the listing details page.

---

## 📤 Image Upload

Images are uploaded using:

* Multer
* Cloudinary
* Multer Storage Cloudinary

This allows users to upload and manage images for their travel listings.

---

## 🔮 Future Improvements

* [ ] Dynamic geocoding for every listing
* [x] Search listings
* [ ] Filter listings by location
* [ ] Wishlist functionality
* [ ] User profile page
* [ ] Multiple image upload
* [ ] Booking functionality
* [ ] Pagination
* [ ] Password reset
* [ ] Email verification

---

## 👨‍💻 Author

**Ravinder Singh**

---

## 📄 License

This project is created for educational and learning purposes.

---

### ⭐ If you like this project, don't forget to give it a star!
