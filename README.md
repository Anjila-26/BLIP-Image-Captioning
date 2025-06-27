# BLIP Image Captioning Application

A full-stack web application that generates descriptive captions for images using the BLIP (Bootstrapping Language-Image Pre-training) model from Salesforce. The application provides a modern, user-friendly interface built with Next.js and a robust FastAPI backend.

## 🌟 Features

- **Dual Input Methods**: Upload local image files or provide image URLs
- **Real-time Preview**: See your image before generating captions
- **AI-Powered Captioning**: Uses Salesforce's BLIP-large model for accurate image descriptions
- **Modern UI**: Clean, responsive interface built with Tailwind CSS
- **Fast Processing**: Optimized for both CPU and GPU inference
- **Error Handling**: Comprehensive error messages and validation

## 🛠 Tech Stack

### Frontend (Next.js)
- **Framework**: Next.js 15.3.4 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Build Tool**: Turbopack (Next.js native bundler)

### Backend (FastAPI)
- **Framework**: FastAPI
- **Language**: Python
- **AI Model**: Salesforce BLIP Image Captioning Large
- **ML Libraries**: 
  - Transformers (Hugging Face)
  - PyTorch
  - PIL (Python Imaging Library)
- **API Features**: CORS enabled, automatic OpenAPI documentation

## 🧠 About BLIP (Bootstrapping Language-Image Pre-training)

BLIP is a state-of-the-art vision-language model developed by Salesforce Research that excels at understanding and describing images in natural language.

### Key Features of BLIP:
- **Unified Architecture**: Single model handles multiple vision-language tasks
- **Bootstrap Learning**: Uses web data with noisy captions and learns to filter and improve them
- **Large Scale Training**: Trained on millions of image-text pairs
- **High Accuracy**: Achieves state-of-the-art results on image captioning benchmarks

### Model Specifications:
- **Model**: `Salesforce/blip-image-captioning-large`
- **Parameters**: ~447M parameters
- **Input**: RGB images (any resolution, automatically resized)
- **Output**: Natural language descriptions in English
- **Performance**: Optimized for both accuracy and speed

### How BLIP Works:
1. **Image Encoding**: Converts input image into feature representations
2. **Text Generation**: Uses transformer architecture to generate captions
3. **Attention Mechanism**: Focuses on relevant image regions while generating text
4. **Beam Search**: Ensures high-quality, coherent caption generation

## 🏗 Project Structure

```
Assignment 5/
├── README.md                 # Project documentation
├── backend/                  # FastAPI backend
│   ├── blip.py              # Main FastAPI application
│   └── __pycache__/         # Python cache files
└── caption/                 # Next.js frontend
    ├── package.json         # Node.js dependencies
    ├── next.config.ts       # Next.js configuration
    ├── tsconfig.json        # TypeScript configuration
    ├── postcss.config.mjs   # PostCSS configuration
    ├── eslint.config.mjs    # ESLint configuration
    ├── public/              # Static assets
    └── src/
        └── app/
            ├── globals.css  # Global styles
            ├── layout.tsx   # Root layout component
            └── page.tsx     # Main application page
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **Python** (v3.8 or higher)
- **pip** (Python package manager)
- **npm/yarn** (Node.js package manager)

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install Python dependencies:**
   ```bash
   pip install fastapi uvicorn torch transformers pillow requests python-multipart
   ```

3. **Start the FastAPI server:**
   ```bash
   uvicorn blip:app --reload --host 0.0.0.0 --port 8000
   ```

   The backend will be available at `http://localhost:8000`

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd caption
   ```

2. **Install Node.js dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

   The frontend will be available at `http://localhost:3000`

## 📱 How to Use

1. **Access the Application**: Open `http://localhost:3000` in your browser
2. **Choose Input Method**: 
   - **Upload Tab**: Select a local image file
   - **URL Tab**: Enter an image URL
3. **Preview**: View your selected image in the preview panel
4. **Generate Caption**: Click "Generate Caption" to process the image
5. **View Results**: The AI-generated caption will appear below the image
6. **Clear**: Use the "Clear" button to reset and try another image

## 🔧 API Endpoints

### POST `/caption/upload`
Upload an image file for captioning.

**Request**: Multipart form data with `uploaded_file` field
**Response**: 
<img src = "upload.png"/>

### POST `/caption/link`
Process an image from a URL.

**Request**: 
```json
{
  "image_link": "https://i.pinimg.com/736x/93/d1/84/93d184b5cf2f8b27e50f4116e9f27b09.jpg"
}
```

**Response**: 
<img src = "url.png"/>

### Error Responses
```json
{
  "error": "error description"
}
```

## 🎨 UI Components

- **Tab Navigation**: Switch between upload and URL input methods
- **File Upload**: Drag-and-drop interface with file selection
- **URL Input**: Text field for image URLs with validation
- **Image Preview**: Real-time image display with error handling
- **Loading States**: Visual feedback during processing
- **Result Display**: Formatted caption output
- **Error Messages**: User-friendly error notifications

## ⚡ Performance Optimizations

### Backend:
- **GPU Acceleration**: Automatic CUDA detection for faster inference
- **Model Caching**: Pre-loaded model to reduce latency
- **Efficient Processing**: Optimized image preprocessing pipeline

### Frontend:
- **Next.js Turbopack**: Ultra-fast bundling and hot reloading
- **Image Optimization**: Built-in Next.js image optimization
- **TypeScript**: Type safety and better development experience
- **Responsive Design**: Mobile-first responsive layout

## 🔍 Development Features

- **Hot Reload**: Both frontend and backend support live reloading
- **Type Safety**: Full TypeScript implementation in frontend
- **API Documentation**: Automatic OpenAPI docs at `http://localhost:8000/docs`
- **CORS Enabled**: Cross-origin requests allowed for development
- **Error Boundaries**: Comprehensive error handling throughout the stack

## 🚀 Deployment Considerations

### Backend Deployment:
- Ensure sufficient memory for model loading (~2GB RAM minimum)
- GPU support recommended for production use
- Configure proper CORS settings for production domains

### Frontend Deployment:
- Build optimized bundle with `npm run build`
- Update API base URL for production backend
- Configure proper environment variables

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- **Salesforce Research** for the BLIP model
- **Hugging Face** for the Transformers library
- **Vercel** for Next.js framework
- **FastAPI** team for the excellent Python framework