# Server Fashion - Backend API

Fashion Management RESTful API built with Node.js, Express, and MongoDB.

## 🚀 Features

- RESTful API architecture
- MongoDB database with Mongoose ODM
- CRUD operations for fashion items
- Filter by style
- CORS enabled for Angular frontends
- Error handling middleware

## 📁 Project Structure

```
server-fashion/
├── models/
│   └── Fashion.js          # Mongoose schema
├── controllers/
│   └── fashionController.js # Business logic
├── routes/
│   └── fashionRoutes.js    # API routes
├── index.js                 # Server entry point
├── seedFashions.js         # Database seeder
└── package.json
```

## 🛠️ Installation

```bash
cd server-fashion
npm install
```

## 💾 Database Setup

1. Make sure MongoDB is running on `localhost:27017`

2. Seed the database with sample data:
```bash
npm run seed
```

This will create the `FashionData` database with 13 fashion items across 3 styles:
- Casual (5 items)
- Streetwear (4 items)
- Formal (4 items)

## 🎯 Running the Server

Development mode:
```bash
npm run dev
```

Production mode:
```bash
npm start
```

Server runs on: **http://localhost:4000**

## 📡 API Endpoints

### Get All Fashions
```
GET /api/fashions
```
Returns all fashion items sorted by creation date (newest first).

### Get Fashions by Style
```
GET /api/fashions/style/:style
```
Examples:
- `/api/fashions/style/Casual`
- `/api/fashions/style/Streetwear`
- `/api/fashions/style/Formal`

### Get Fashion by ID
```
GET /api/fashions/:id
```

### Create New Fashion
```
POST /api/fashions
Content-Type: application/json

{
  "title": "Fashion Title",
  "details": "<p>HTML content supported</p>",
  "thumbnail": "https://example.com/image.jpg",
  "style": "Casual"
}
```

### Update Fashion
```
PUT /api/fashions/:id
Content-Type: application/json

{
  "title": "Updated Title",
  "details": "<p>Updated content</p>",
  "thumbnail": "https://example.com/new-image.jpg",
  "style": "Streetwear"
}
```

### Delete Fashion
```
DELETE /api/fashions/:id
```

## 📊 Data Model

```javascript
{
  _id: ObjectId,           // Auto-generated
  title: String,           // Required
  details: String,         // HTML supported, Required
  thumbnail: String,       // Image URL, Required
  style: String,           // 'Casual', 'Streetwear', or 'Formal'
  createdAt: Date          // Auto-generated
}
```

## 🔧 Technologies

- Node.js
- Express.js
- MongoDB
- Mongoose
- CORS
- Body Parser
- Morgan (logging)

## 🌐 CORS Configuration

Allowed origins:
- http://localhost:4001 (Admin)
- http://localhost:4002 (Client)

## 📝 License

ISC
