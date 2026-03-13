# 🚀 Vector.AI - AI-Powered Content Creation Platform

<div align="center">

  **A comprehensive full-stack AI SaaS application that empowers users to create content, generate images, and enhance their digital assets using cutting-edge artificial intelligence.**

  [🌐 **Live Demo**](https://vectorai.aashutosh.me/) • [📖 **Documentation**](#-table-of-contents) • [🚀 **Quick Start**](#-quick-start) • [🤝 **Contributing**](#-contributing)

</div>

---

## 📸 Screenshots

<div align="center">
  <img src="img/img1.png" alt="Vector.AI Dashboard & Features" width="45%"/>
  <img src="img/img2.png" alt="AI Content Generation Interface" width="45%"/>
</div>

## 🎯 Features

> **Transform your content creation workflow with AI-powered tools**

### 🎯 Core AI Tools
- **AI Article Writer**: Generate high-quality, engaging articles with customizable length (500-1600+ words)
- **Blog Title Generator**: Create catchy and SEO-optimized titles across 8 different categories
- **AI Image Generation**: Produce stunning images from text prompts with 8+ artistic styles
- **Background Removal**: Automatically remove backgrounds from images using AI
- **Object Removal**: Seamlessly erase unwanted objects from photos
- **Resume Reviewer**: Get AI-driven feedback and suggestions to improve your resume

### 👥 User Experience
- **Authentication**: Secure user management with Clerk
- **Dashboard**: Personal workspace to view all your AI creations
- **Community Gallery**: Share and discover AI-generated content from other users
- **Like System**: Engage with community content through likes
- **Usage Plans**: Free tier with limits + Premium unlimited access

### 🔧 Technical Features
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Real-time Feedback**: Toast notifications for all user actions
- **File Upload**: Secure image and PDF upload functionality (5MB limit)
- **Content Management**: Publish/unpublish your creations
- **Database Persistence**: All creations are stored and retrievable
- **Download Functionality**: Download all generated content (images as PNG, text as TXT)
- **Loading Animations**: Beautiful animated loading states during processing
- **Error Handling**: Comprehensive error handling with user-friendly messages
- **Rate Limiting**: Built-in API rate limiting and usage tracking

## 🛠 Tech Stack

### Frontend
- **React 19** - Modern UI library
- **Vite** - Fast build tool and development server
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API requests
- **Lucide React** - Beautiful icon library
- **React Hot Toast** - Elegant notifications
- **React Markdown** - Markdown rendering
- **Clerk** - Authentication and user management

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web application framework
- **PostgreSQL** - Primary database (via Neon)
- **Clerk Express** - Authentication middleware
- **Cloudinary** - Image storage and processing
- **Multer** - File upload handling
- **OpenAI API** - AI text generation (via Gemini)
- **ClipDrop API** - AI image generation
- **PDF Parse** - Resume processing

### Database & Storage
- **Neon PostgreSQL** - Serverless PostgreSQL database
- **Cloudinary** - Cloud-based image and video management

## 🚀 Quick Start

Get Vector.AI running in under 5 minutes:

```bash
# 1. Clone the repository
git clone https://github.com/aashutosh585/Vector.AI.git
cd Vector.AI

# 2. Install dependencies (both client and server)
npm run install:all

# 3. Set up environment variables (see .env.example files)
cp client/.env.example client/.env
cp server/.env.example server/.env

# 4. Start development servers
npm run dev
```
## 🔐 Environment Variables

### Frontend (.env)

Create a `.env` file in the `client` directory:

```env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
VITE_BASE_URL=http://localhost:3000
```

### Backend (.env)

Create a `.env` file in the `server` directory:

```env
# Database
DATABASE_URL=your_neon_postgresql_connection_string

# Authentication
CLERK_SECRET_KEY=your_clerk_secret_key
CLERK_WEBHOOK_SECRET=your_clerk_webhook_secret

# AI Services
GEMINI_API_KEY=your_gemini_api_key
CLIPDROP_API_KEY=your_clipdrop_api_key

# Cloud Storage
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Server
PORT=3000
NODE_ENV=development
```

## 🏃‍♂️ Usage

### Development Mode

1. **Start the Backend Server**:
```bash
cd server
npm run server
```

2. **Start the Frontend Development Server**:
```bash
cd client
npm run dev
```

3. **Access the Application**:
   - Frontend: `http://localhost:5173`
   - Backend API: `http://localhost:3000`

### Production Mode

1. **Build the Frontend**:
```bash
cd client
npm run build
```

2. **Start the Production Server**:
```bash
cd server
npm start
```

## � API Documentation

### 🤖 AI Endpoints (`/api/ai`)

| Method | Endpoint | Description | Parameters | Response | Auth |
|--------|----------|-------------|------------|----------|------|
| POST | `/generate-article` | Generate articles with custom length | `prompt`, `length` | `{success, content}` | ✅ |
| POST | `/generate-blog-title` | Create blog titles by category | `prompt` | `{success, content}` | ✅ |
| POST | `/generate-images` | Generate images from text prompts | `prompt`, `publish` | `{success, content}` | ✅ |
| POST | `/remove-background` | Remove image backgrounds | `image` (file) | `{success, content}` | ✅ |
| POST | `/remove-image-object` | Remove objects from images | `image` (file), `object` | `{success, content}` | ✅ |
| POST | `/resume-review` | Analyze and review resumes | `resume` (PDF file) | `{success, content}` | ✅ |

### 👤 User Endpoints (`/api/user`)

| Method | Endpoint | Description | Parameters | Response | Auth |
|--------|----------|-------------|------------|----------|------|
| GET | `/get-user-creations` | Fetch user's all creations | - | `{success, creations[]}` | ✅ |
| GET | `/get-published-creations` | Fetch public community creations | - | `{success, creations[]}` | ✅ |
| POST | `/toggle-like-creation` | Like/unlike community creations | `id` | `{success, message}` | ✅ |


## 🗄 Database Schema

### Creations Table

```sql
CREATE TABLE creations (
  id SERIAL PRIMARY KEY,
  user_id VARCHAR(255) NOT NULL,
  prompt TEXT NOT NULL,
  content TEXT NOT NULL,
  type VARCHAR(50) NOT NULL, -- 'article', 'blog-title', 'image'
  publish BOOLEAN DEFAULT false,
  likes TEXT[], -- Array of user IDs who liked
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

## 🎯 Key Features Explained

### AI Article Writer
- Generate articles from 500 to 1600+ words
- Customizable prompts and topics
- Markdown formatting support
- Instant preview and editing

### Blog Title Generator
- 8 categories: General, Technology, Health, Lifestyle, Travel, Food, Education, Business
- SEO-optimized suggestions
- Multiple title variations per request

### AI Image Generation
- 8 artistic styles: Realistic, Ghibli, Cartoon, Anime, Fantasy, 3D, Portrait
- High-quality image output
- Cloudinary integration for storage
- Community sharing options

### Background & Object Removal
- AI-powered precision removal
- Support for JPG, PNG formats
- Real-time processing feedback
- Download and save functionality

### Community Features
- Public gallery of user creations
- Like and engagement system
- Real-time updates
- User authentication integration


---

<div align="center">

### 🚀 **Built with ❤️ by [Ashutosh Maurya](https://github.com/aashutosh585)**

*"Empowering creators with AI - one prompt at a time"*

[![Made with Love](https://img.shields.io/badge/Made%20with-❤️-red?style=for-the-badge)](https://github.com/aashutosh585)
[![Open Source](https://img.shields.io/badge/Open%20Source-💚-green?style=for-the-badge)](https://github.com/aashutosh585/Vector.AI)
[![AI Powered](https://img.shields.io/badge/AI%20Powered-🤖-blue?style=for-the-badge)](https://vectorai.aashutosh.me/)

---

**👨‍💻 Developer Portfolio:** [www.aashutosh.me](https://www.aashutosh.me)

**[⬆ Back to Top](#-vectorai---ai-powered-content-creation-platform)**

</div>
