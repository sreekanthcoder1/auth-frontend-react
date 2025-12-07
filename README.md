# React Authentication Frontend

A modern React application for user authentication with clean UI, JWT integration, and Docker support.

## 🚀 Features

- **Modern React 18** with Vite for fast development
- **Clean UI Design** with responsive layout
- **JWT Authentication** integration with backend API
- **Form Validation** with user-friendly error handling
- **Route Protection** for authenticated users
- **Docker Support** with multi-stage builds
- **Development Hot Reload** with Vite dev server
- **Production Optimization** with Nginx

## 🛠️ Tech Stack

- **React 18.2.0** - UI library
- **React Router DOM** - Client-side routing
- **Vite** - Build tool and dev server
- **JavaScript (ES6+)** - Modern JavaScript
- **CSS3** - Custom styling with responsive design
- **Docker** - Containerization
- **Nginx** - Production web server

## 🔧 Quick Start

### Option 1: Development Server

```bash
# Clone the repository
git clone https://github.com/sreekanthcoder1/auth-frontend-react.git
cd auth-frontend-react

# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:5173
```

### Option 2: Docker Development

```bash
# Build development container
docker build -f Dockerfile.dev -t auth-frontend-dev .

# Run with hot reload
docker run -p 5173:5173 \
  -v $(pwd):/app \
  -v /app/node_modules \
  auth-frontend-dev
```

### Option 3: Production Docker

```bash
# Build production container
docker build -t auth-frontend .

# Run production container
docker run -p 3000:80 \
  -e VITE_API_URL="https://your-backend.com" \
  auth-frontend
```

## 📋 Prerequisites

- Node.js 16+
- npm or yarn
- Docker (for containerized deployment)
- Backend API running (for full functionality)

## 🌐 Environment Configuration

### Development (.env)
```env
VITE_API_URL=http://localhost:8080
```

### Production (.env.production)
```env
VITE_API_URL=https://your-production-backend.com
```

## 📱 Application Pages

### 🔑 Authentication Pages
- **Sign Up** (`/signup`) - User registration
- **Login** (`/login`) - User authentication
- **Dashboard** (`/dashboard`) - Protected user area

### 🛡️ Route Protection
- Public routes: `/login`, `/signup`
- Protected routes: `/dashboard`
- Automatic redirect to login if not authenticated

## 🎨 UI Components

### Form Components
- **AuthForm** - Reusable authentication form
- **Input validation** with real-time feedback
- **Loading states** during API calls
- **Error handling** with user-friendly messages

### Layout Components
- **Responsive design** for mobile and desktop
- **Clean navigation** with authentication state
- **Professional styling** with modern CSS

## 🔌 API Integration

### Authentication Service (`src/api.js`)

```javascript
// Sign up new user
const signup = async (userData) => {
  const response = await fetch(`${API_URL}/api/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  });
  return response.json();
};

// Login user
const login = async (credentials) => {
  const response = await fetch(`${API_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials)
  });
  return response.json();
};
```

### JWT Token Management
- Automatic token storage in localStorage
- Token validation and expiry handling
- Automatic logout on token expiration

## 🐳 Docker Configuration

### Development Dockerfile (Dockerfile.dev)
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5173
USER reactuser
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
```

### Production Dockerfile
```dockerfile
# Build stage
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

## 🚀 Deployment

### Vercel Deployment (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard
VITE_API_URL=https://your-backend.vercel.app
```

### Netlify Deployment
```bash
# Build the project
npm run build

# Deploy dist folder to Netlify
# Set environment variables:
# VITE_API_URL=https://your-backend.netlify.app
```

### Railway Deployment with Docker
1. Connect GitHub repository to Railway
2. Railway detects Dockerfile automatically
3. Set environment variables in Railway dashboard
4. Deploy on git push

## 📁 Project Structure

```
src/
├── pages/
│   ├── Login.jsx           # Login page component
│   ├── Signup.jsx          # Registration page component
│   └── Dashboard.jsx       # Protected user dashboard
├── App.jsx                 # Main app component with routing
├── api.js                  # API service functions
├── index.css              # Global styles
└── main.jsx               # App entry point

public/
├── index.html             # HTML template
└── vite.svg               # Vite logo

Docker files:
├── Dockerfile             # Production build
├── Dockerfile.dev         # Development build
└── .dockerignore         # Docker ignore rules
```

## 🎯 Key Features Implementation

### Authentication Flow
1. User submits login/signup form
2. Frontend validates input
3. API request sent to backend
4. JWT token received and stored
5. User redirected to dashboard
6. Protected routes accessible

### Form Validation
```javascript
// Example validation in Login component
const validateForm = (email, password) => {
  if (!email || !email.includes('@')) {
    setError('Please enter a valid email');
    return false;
  }
  if (!password || password.length < 6) {
    setError('Password must be at least 6 characters');
    return false;
  }
  return true;
};
```

### Error Handling
- Network error handling
- API error message display
- Form validation feedback
- Loading state management

## 🔧 Development Scripts

```bash
# Development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Lint code
npm run lint
```

## 🐛 Troubleshooting

### CORS Issues
Make sure your backend allows your frontend origin:
```javascript
// Backend should include frontend URL in CORS origins
CORS_ORIGINS=http://localhost:5173,https://your-frontend.com
```

### API Connection Issues
```bash
# Check if backend is running
curl http://localhost:8080/api/auth/signup

# Verify environment variables
echo $VITE_API_URL

# Check network tab in browser DevTools
```

### Build Issues
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear Vite cache
npm run dev -- --force
```

### Docker Issues
```bash
# Rebuild without cache
docker build --no-cache -t auth-frontend .

# Check container logs
docker logs <container-id>

# Test container locally
docker run -p 3000:80 auth-frontend
```

## 📊 Performance Optimization

### Build Optimizations
- Code splitting with React.lazy (ready to implement)
- Tree shaking with Vite
- Asset optimization and compression
- Minification in production builds

### Runtime Optimizations
- Efficient re-renders with proper state management
- Memoization for expensive computations
- Optimized bundle size with ES modules

## 🔒 Security Features

- **XSS Protection**: Proper input sanitization
- **CSRF Protection**: SameSite cookies ready
- **Secure Token Storage**: localStorage with expiry
- **Route Protection**: Authentication guards
- **HTTPS Ready**: Production configuration

## 📱 Responsive Design

- **Mobile First**: Optimized for mobile devices
- **Tablet Support**: Medium screen adaptations
- **Desktop Optimized**: Full desktop experience
- **Touch Friendly**: Mobile interaction patterns

## 🧪 Testing (Ready to implement)

### Recommended Testing Setup
```bash
# Install testing dependencies
npm install --save-dev @testing-library/react @testing-library/jest-dom vitest

# Add test scripts to package.json
"test": "vitest"
"test:ui": "vitest --ui"
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/your-feature`
3. Make your changes
4. Test your changes thoroughly
5. Commit: `git commit -m "Add your feature"`
6. Push: `git push origin feature/your-feature`
7. Submit pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

If you encounter issues:

1. Check browser DevTools console for errors
2. Verify backend API is running and accessible
3. Check environment variables are set correctly
4. Review network requests in DevTools
5. Create an issue on GitHub with error details

## 🔗 Related Repositories

- **Backend API**: [auth-backend-springboot](https://github.com/sreekanthcoder1/auth-backend-springboot)
- **Full Project**: Complete authentication application with Docker setup

## 🎊 Live Demo

Experience the application:
- **Frontend**: [Your deployment URL]
- **API Docs**: [Your backend URL]/api/docs

---

**Ready for modern authentication with React! 🚀**