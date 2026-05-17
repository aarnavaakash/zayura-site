# Zayura E-commerce

Full-stack e-commerce website for the Zayura cleanware brand. It includes a React + Tailwind customer storefront, admin control panel, Express REST API, MongoDB models, JWT authentication, Cloudinary image uploads, COD orders, wishlist, reviews, coupons, contact messages and low-stock admin warnings.

## Folder Structure

- `client/` - React, Tailwind CSS, customer pages and admin panel
- `server/` - Node.js, Express.js, MongoDB, JWT APIs

## Run Frontend

```bash
cd client
npm install
copy .env.example .env
npm run dev
```

Frontend runs at `http://localhost:5173`.

## Run Backend

```bash
cd server
npm install
copy .env.example .env
npm run seed
npm run dev
```

Backend runs at `http://localhost:5000`.

## Required Environment Variables

Server `.env`:

```env
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173
MONGO_URI=your_mongodb_atlas_uri
JWT_SECRET=your_long_random_secret
JWT_EXPIRES_IN=7d
ADMIN_NAME=Zayura Admin
ADMIN_EMAIL=admin@zayura.com
ADMIN_PHONE=9999999999
ADMIN_PASSWORD=ChangeMe123!
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Client `.env`:

```env
VITE_API_URL=http://localhost:5000/api
VITE_WHATSAPP_NUMBER=919999999999
```

## Create Admin Account

Set `ADMIN_EMAIL`, `ADMIN_PASSWORD`, and other admin variables in `server/.env`, then run:

```bash
cd server
npm run seed
```

The same command also creates starter categories, sample products, and a `ZAYURA10` coupon.

## Deployment

### Backend on Render

1. Push the project to GitHub.
2. Create a Render Web Service with root directory `server`.
3. Set build command: `npm install`.
4. Set start command: `npm start`.
5. Add all server environment variables in Render.
6. Use MongoDB Atlas for `MONGO_URI`.
7. Use Cloudinary credentials so uploaded admin images persist after deployment.

### Frontend on Vercel

1. Import the GitHub repo in Vercel.
2. Set root directory `client`.
3. Set build command: `npm run build`.
4. Set output directory: `dist`.
5. Add `VITE_API_URL=https://your-render-service.onrender.com/api`.
6. Add `VITE_WHATSAPP_NUMBER`.

## Main API Routes

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/products`
- `POST /api/products` admin
- `PUT /api/products/:id` admin
- `DELETE /api/products/:id` admin
- `GET /api/categories`
- `POST /api/categories` admin
- `POST /api/orders` user
- `GET /api/orders/mine` user
- `GET /api/orders` admin
- `PUT /api/orders/:id/status` admin
- `POST /api/contact`
- `POST /api/upload` admin, Cloudinary
- `GET /api/coupons/:code`

## Notes

Uploaded images are stored in Cloudinary, not in the local filesystem. The admin product form also accepts permanent image URLs, which is useful while Cloudinary credentials are not configured.
