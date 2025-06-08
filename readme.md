  # 🛒 Express.js Products API

## 🚀 Getting Started

### Prerequisites
- Node.js v18 or higher
- npm

### Installation

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd <your-repo-folder>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file based on `.env.example`:
   ```bash
   cp .env.example .env
   ```
   Edit `.env` to set your `PORT` and `API_KEY`.

4. Start the server:
   ```bash
   npm start
   ```

5. The server will run at `http://localhost:3000` (or your specified port).

---

## 📚 API Documentation

### Authentication

All protected routes require an `x-api-key` header:
```
x-api-key: your_api_key_here
```

---

### Endpoints

#### 1. List Products (with filtering & pagination)
- **GET** `/api/products`
- **Query Params:**  
  - `category` (optional): filter by category  
  - `page` (optional): page number (default 1)  
  - `limit` (optional): items per page (default 10)

#### 2. Get Product by ID
- **GET** `/api/products/:id`

#### 3. Create Product
- **POST** `/api/products`
- **Body:**
  ```json
  {
    "name": "Laptop",
    "description": "High-performance laptop",
    "price": 1200,
    "category": "electronics",
    "inStock": true
  }
  ```

#### 4. Update Product
- **PUT** `/api/products/:id`
- **Body:** (any updatable fields)

#### 5. Delete Product
- **DELETE** `/api/products/:id`

#### 6. Search Products by Name
- **GET** `/api/products/search?name=laptop`

#### 7. Product Statistics
- **GET** `/api/products/stats`

---

## 📝 Example Requests & Responses

### Create Product

**Request:**
```http
POST /api/products
x-api-key: your_api_key_here
Content-Type: application/json

{
  "name": "Tablet",
  "description": "10-inch Android tablet",
  "price": 300,
  "category": "electronics",
  "inStock": true
}
```

**Response:**
```json
{
  "id": "4",
  "name": "Tablet",
  "description": "10-inch Android tablet",
  "price": 300,
  "category": "electronics",
  "inStock": true
}
```

---

### Get All Products (with Pagination)

**Request:**
```
GET /api/products?page=1&limit=2
x-api-key: your_api_key_here
```

**Response:**
```json
{
  "page": 1,
  "limit": 2,
  "total": 4,
  "products": [
    {
      "id": "1",
      "name": "Laptop",
      "description": "High-performance laptop with 16GB RAM",
      "price": 1200,
      "category": "electronics",
      "inStock": true
    },
    {
      "id": "2",
      "name": "Smartphone",
      "description": "Latest model with 128GB storage",
      "price": 800,
      "category": "electronics",
      "inStock": true
    }
  ]
}
```

---

### Search Products

**Request:**
```
GET /api/products/search?name=coffee
x-api-key: your_api_key_here
```

**Response:**
```json
[
  {
    "id": "3",
    "name": "Coffee Maker",
    "description": "Programmable coffee maker with timer",
    "price": 50,
    "category": "kitchen",
    "inStock": false
  }
]
```

---

### Product Statistics

**Request:**
```
GET /api/products/stats
x-api-key: your_api_key_here
```

**Response:**
```json
{
  "electronics": 3,
  "kitchen": 1
}
```

---

## 🛠️ Notes

- All endpoints (except `/`) require the correct `x-api-key` header.
- Error responses will include an `error` message and appropriate HTTP status code.

---