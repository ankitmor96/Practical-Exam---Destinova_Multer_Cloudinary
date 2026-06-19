# Practical-Exam---Destinova_Multer_Cloudinary

A robust RESTful API for managing travel packages with image upload support using Cloudinary + Multer, built with Express.js and MongoDB.

📌 Features
Create Travel Packages with multiple images
Upload images directly to Cloudinary
Automatic image transformation (resize, optimize, WebP conversion)
Get all packages
Get package by ID
Update package with optional image replacement
Delete package + remove images from Cloudinary
Centralized error handling
Secure file filtering (JPG, JPEG, PNG only)


🧰 Tech Stack
Node.js
Express.js
MongoDB
Mongoose
Cloudinary
Multer
dotenv (environment variable management)


📁 Project Structure
project-root/
│
├── config/
│   ├── db.js
│   └── cloudinary.js
│
├── controller/
│   └── packageController.js
│
├── middleware/
│   ├── HttpError.js
│   └── multer.js
│
├── model/
│   └── packageModel.js
│
├── routes/
│   └── packageRoutes.js
│
├── server.js
├── .env
└── package.json



⚙️ Installation & Setup


1️⃣ Clone repository
git clone [https://github.com/your-username/destinova-api.git](https://github.com/ankitmor96/Practical-Exam---Destinova_Multer_Cloudinary)
cd destinova-api


2️⃣ Install dependencies
npm install


3️⃣ Create .env file
PORT=5000

# MongoDB
MONGO_URI=mongodb://127.0.0.1:27017/destinova

<img width="1902" height="972" alt="Screenshot 2026-06-19 120926" src="https://github.com/user-attachments/assets/df731990-68ea-4b4c-bd97-bef16cf5b7ca" />


# Cloudinary

<img width="1906" height="970" alt="Screenshot 2026-06-19 131341" src="https://github.com/user-attachments/assets/5ec83468-29f5-4c33-841b-319ac32d37e1" />


CLOUDINARY_NAME=your_cloud_name
CLOUDINARY_API=your_api_key
CLOUDINARY_API_SECRET=your_api_secret


▶️ Run Project
Development mode
npm run dev
Production mode
npm start


🌐 Base URL
http://localhost:5000/Packages
📡 API Endpoints

1. ➕ Create Package

POST /add

<img width="1573" height="918" alt="Screenshot 2026-06-19 090016" src="https://github.com/user-attachments/assets/31a8274a-0a65-491a-8564-99698b2623fc" />


Form-data (required)
Field	Type
PackageName	String
PackagePrice	Number
StartDate	Date
EndDate	Date
Duration	String
Destination	String
PackageType	String
PackageImages	File (multiple)
Response
{
  "success": true,
  "message": "new package data add successFully",
  "data": {}
}


2. 📥 Get All Packages

GET /getAllPackages

<img width="1577" height="905" alt="Screenshot 2026-06-19 114056" src="https://github.com/user-attachments/assets/9fbacff9-dbaf-44d9-9355-4d3924600082" />


Response
{
  "success": true,
  "message": "packages data found",
  "data": []
}


3. 🔍 Get Package By ID

GET /getPackagesById/:id

<img width="1577" height="905" alt="Screenshot 2026-06-19 114056" src="https://github.com/user-attachments/assets/c7459e08-2ced-419a-933b-4d46f0ad8df7" />


Response
{
  "success": true,
  "message": "packages id found",
  "data": {}
}



4. ❌ Delete Package

DELETE /deletePackages/:id

<img width="1583" height="900" alt="Screenshot 2026-06-19 114349" src="https://github.com/user-attachments/assets/151a4dfb-f295-4367-a97c-53a21a91b4b6" />


Behavior:
Deletes package from MongoDB
Deletes all images from Cloudinary
Response
{
  "success": true,
  "message": "delete successFully"
}


5. ✏️ Update Package

PUT /:id

<img width="1558" height="908" alt="Screenshot 2026-06-19 114254" src="https://github.com/user-attachments/assets/246c34fd-0de7-4c78-9905-ce81b524693a" />


Features:
Update package fields
Replace images (old images auto-deleted from Cloudinary)
Partial update supported
Allowed fields:
PackageName
PackagePrice
StartDate
EndDate
Duration
Destination
PackageType



📤 Image Upload Rules
Only images allowed:
image/jpeg
image/jpg
image/png
Max file size: 20MB
Max files: 15 images
Stored in Cloudinary folder: destinova
Auto transformations:
Resize: 500x500 (limit)
Format: WebP
Quality: auto
🧠 Error Handling


Central error middleware handles:

Invalid routes
Missing fields
Invalid package ID
File upload errors

Example:

{
  "message": "packages image not found"
}



🗄️ Database Schema
Package {
  PackageName: String,
  PackagePrice: Number,
  StartDate: Date,
  EndDate: Date,
  Duration: String,
  Destination: String,
  PackageType: String,
  PackageImages: [
    {
      url: String,
      cloudinary_id: String
    }
  ]
}


🔥 Key Highlights
Clean MVC architecture
Cloud-based image storage
Secure file validation
Scalable REST API design
Production-ready structure


🧑‍💻 Author


Ankit Mor

📌 Future Improvements
JWT Authentication
Pagination for packages
Search & filter API
Rate limiting
Admin dashboard integration



If you want, I can also:
✅ Add Swagger API documentation
✅ Convert this into a GitHub-ready professional README with badges
✅ Or generate Postman collection for all APIs

Just tell me 👍
