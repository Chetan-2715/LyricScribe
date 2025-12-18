# LyricScribe - Native Kannada Transliteration

A specialized AI-powered tool designed for video editors and content creators. LyricScribe instantly transliterates Kannada lyrics written in Devanagari (Marathi) script back into native Kannada characters.

![LyricScribe App](https://via.placeholder.com/800x400?text=LyricScribe+Preview)

## 🚀 Features

- **Handwriting Recognition**: Upload images of handwritten lyrics.
- **Smart Transliteration**: Uses **Gemini 1.5 Flash** to accurately phoneticize and convert Devanagari script to Kannada.
- **Clean Output**: Returns separate blocks for original extracted text and the transliterated Kannada result.
- **Video Editor Focused**: Streamlines the workflow for lyric video creation where source material is often handwritten in a different script.
- **Modern UI**: Built with a responsive, dark-mode aesthetic using Tailwind CSS.

## 🛠️ Tech Stack

- **Frontend**: React + Vite
- **Styling**: Tailwind CSS
- **AI Model**: Google Gemini 1.5 Flash
- **Language**: TypeScript

## ⚙️ Setup & Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd transliteration-app
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   Create a `.env.local` file in the root directory and add your Gemini API Key:
   ```env
   GEMINI_API_KEY=your_api_key_here
   ```
   *Note: You can use `VITE_GEMINI_API_KEY` or `API_KEY` as well.*

4. **Run Locally**
   Start the development server:
   ```bash
   npm run dev
   ```

## 📝 Usage

1. Open the app in your browser (usually `http://localhost:3000`).
2. Click to upload or drag & drop an image of handwritten lyrics.
3. Wait for the AI to process the image.
4. Copy the transliterated Kannada text for your project.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
