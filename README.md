# MRI Insight

A modern, elegant web application for uploading, analyzing, and explaining MRI scans using AI-powered analysis.

## Features

- 🏥 **MRI Upload & Analysis**: Support for DICOM and common image formats
- 🔍 **Tavily AI Integration**: Real-time medical literature search for analysis insights
- 🎨 **Modern UI/UX**: Clean, responsive design with dark/light theme support
- 📊 **Intelligent Analysis**: AI-powered scan interpretation using medical knowledge
- 📄 **PDF Reports**: Generate downloadable analysis reports
- ♿ **Accessible**: Full keyboard navigation and ARIA support

## Tech Stack

- **Frontend**: Next.js 14 + React 18 + TypeScript
- **Styling**: Tailwind CSS + Framer Motion
- **Backend**: Next.js API Routes
- **AI Integration**: Tavily AI API
- **Image Processing**: DICOM parser + Cornerstone.js

## Prerequisites

- Node.js 18+ 
- npm or yarn
- Tavily AI API key

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/skkuhg/MRI-Insight.git
   cd MRI-Insight
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` and add your Tavily API key:
   ```
   TAVILY_API_KEY=your_tavily_api_key_here
   ```
   
   **⚠️ Security Note**: Never commit your `.env.local` file to version control. 
   Your API key should be kept secret and only stored locally.

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. **Upload Scans**: Drag and drop MRI files or click to browse
2. **View Gallery**: Browse uploaded scans in the responsive grid
3. **Analyze**: Click on any scan to view detailed AI analysis
4. **Download Reports**: Generate PDF reports for any analyzed scan

## Docker Deployment

Build and run with Docker:

```bash
# Build the image
docker build -t mri-insight .

# Run the container
docker run -p 3000:3000 --env-file .env.local mri-insight
```

Or use Docker Compose:

```bash
docker-compose up -d
```

## API Endpoints

- `POST /api/analyze` - Upload and analyze MRI scan
- `POST /api/chat` - Ask questions about uploaded scans
- `GET /api/reports/:id` - Generate PDF report for scan

## Testing

Run the test suite:

```bash
npm test
```

Run tests in watch mode:

```bash
npm run test:watch
```

## Project Structure

```
src/
├── app/              # Next.js app directory
├── components/       # React components
├── lib/             # Utility functions and API clients
├── types/           # TypeScript type definitions
└── hooks/           # Custom React hooks
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Security Notes

- API keys are stored securely in environment variables
- Patient data is handled anonymously
- All uploads are processed server-side
- HTTPS is required for production deployment

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Tavily AI for providing the analysis API
- Cornerstone.js for DICOM visualization
- Next.js team for the amazing framework

## 💬 Chat & Q&A Feature

The MRI Insight application now includes an intelligent chat interface that allows you to ask questions about your uploaded MRI scans.

### How to Use the Chat Feature

1. **Upload an MRI scan** using the drag-and-drop interface
2. **Wait for analysis** to complete (shows confidence score)
3. **Access the chat in two ways**:
   - Click the **"Ask Questions"** button in the analysis results modal
   - Use the **floating chat button** (bottom-right corner) when you have uploaded scans

### Chat Interface Features

- **Scan-Specific Context**: The AI knows which scan you're asking about
- **Medical Knowledge**: Responses based on medical literature and MRI interpretation
- **Educational Focus**: Explanations of anatomical structures and medical terminology
- **Safe Disclaimers**: Proper medical disclaimers about AI limitations
- **Interactive Conversation**: Ask follow-up questions for deeper understanding

### Example Questions You Can Ask

- "What brain structures are visible in this scan?"
- "Are there any abnormalities in the white matter?"
- "Can you explain what this bright signal indicates?"
- "Is this a normal-appearing brain MRI?"
- "What should I look for in the cerebellum?"
- "What does hyperintense mean in MRI?"
- "Can you identify the different anatomical regions?"

### Sample Conversation

```
User: "What can you tell me about this brain MRI?"

AI: "This appears to be an axial brain MRI scan. I can see the major brain structures including the cerebral hemispheres, ventricles, and brainstem. The image shows good contrast between gray and white matter. Would you like me to explain any specific anatomical structures or findings?"

User: "Can you explain the ventricles?"

AI: "The cerebral ventricles are fluid-filled spaces within the brain that produce and circulate cerebrospinal fluid (CSF). In this scan, I can identify the lateral ventricles, which appear as dark spaces on either side of the brain..."
```

### API Endpoints for Chat

- `POST /api/chat` - Main chat endpoint for asking questions about scans
  - **Request**: `{ message: string, scanId: string, chatHistory?: ChatMessage[] }`
  - **Response**: `{ success: boolean, message: string, error?: string }`
