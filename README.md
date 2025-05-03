# Kamikaze – Modern MERN E-Commerce Clothing App
![Image](https://github.com/user-attachments/assets/c2c07a96-1f23-47c6-974a-adc2509bee4c)

**Kamikaze** is a sleek and fully responsive e-commerce clothing platform built with the **MERN stack (MongoDB, Express.js, React.js, Node.js)**. Designed for performance and style, Kamikaze delivers a premium shopping experience, whether you're a buyer or an admin managing the store.

## 📹 Demo Video

Click the image below to watch the demo:

[![Watch the demo](https://img.youtube.com/vi/46pNyeggHL4/0.jpg)](https://www.youtube.com/watch?v=46pNyeggHL4)

---

## 🚀 Features

- 🔐 **User Authentication & JWT Authorization**
- 🛒 **Add to Cart, Remove, and Dynamic Checkout**
- 💳 **PayPal Payment Gateway Integration**
- 🧾 **Admin Dashboard for Managing Products and Users**
- 📦 **Product Filtering by Category, Price, and Style**
- 📱 **Fully Responsive Design**
- ⚡ **Optimized for Speed and Usability**

---

## 🧰 Tech Stack

- **Frontend:** React.js, Redux, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB + Mongoose
- **Authentication:** JSON Web Tokens (JWT)
- **Payments:** PayPal SDK

---

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/Hargun-Preet/kamikaze.git
cd kamikaze
```

# Install server and client dependencies
```bash
npm install             # in the root folder
npm install             # for backend
cd client && npm install   # for frontend
```

## 🔐 Environment Variables

Create a `.env` file in the root directory and add the following:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/ECommerceStore
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development


# Email for order notifications (Optional)
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_app_password

# PayPal Integration
PAYPAL_CLIENT_ID=your_paypal_client_id
PAYPAL_EMAIL=your_paypal_email@example.com
PAYPAL_PASSWORD=your_paypal_sandbox_password
```

# Start the development server
```bash
cd frontend
npm run frontend
cd backend
npm run backend
```
