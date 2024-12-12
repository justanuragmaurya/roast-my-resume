# Roast My Resume - Project Documentation

## Overview

Roast My Resume is a web application that provides humorous critiques of resumes using AI. The application takes a user's resume in PDF format and generates a comedic "roast" using OpenAI's GPT model, highlighting aspects of the resume in a lighthearted way.

---

## Tech Stack

### Frontend
- **React**: UI library for building the user interface  
- **TypeScript**: For type-safe code  
- **Vite**: Build tool and development server  
- **Tailwind CSS**: For styling and responsive design  
- **Framer Motion**: For animations  
- **Axios**: For API requests  

### Backend
- **Express.js**: Web server framework  
- **TypeScript**: For type-safe backend code  
- **Multer**: For handling file uploads  
- **pdf-parse**: For extracting text from PDF files  
- **OpenAI API**: For generating roasts  

### Development Tools
- **ESLint**: Code linting  
- **PostCSS**: CSS processing  
- **Vercel Analytics**: For tracking usage metrics  

---

## Core Features

### 1. Resume Upload
- Drag-and-drop interface for file upload  
- Support for PDF files only  
- File size limit of 5MB  
- Visual feedback during upload process  

### 2. PDF Processing
- Secure file handling  
- Text extraction from PDF documents  
- Error handling for corrupted files  

### 3. AI Integration
- Integration with OpenAI's GPT model  
- Custom prompt engineering for humorous responses  
- Rate limiting and error handling  

### 4. User Interface
- Responsive design for all devices  
- Loading states and animations  
- Error messaging  
- Clean and modern aesthetic  

---

## Application Flow

1. **User Entry**  
   - User visits the website  
   - Presented with upload interface  

2. **File Upload**  
   - User drags or selects a PDF resume  
   - Frontend validates file type and size  
   - Visual confirmation of successful upload  

3. **Processing**  
   - File sent to backend server  
   - PDF text extracted  
   - Content sent to OpenAI API  

4. **Response**  
   - AI-generated roast returned to frontend  
   - Displayed in formatted view  
   - Option to generate new roast  