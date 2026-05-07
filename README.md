# 🤖 Is This AI? – AI Image Detector

> Upload an image. Find out if it was made by a human — or something else.

**Is This AI?** is a modern web app that analyzes images using multiple AI detection models and returns a confidence verdict on whether the image is AI-generated or human-made. Results are streamed in real-time with live progress feedback.

---

## ✨ Features

- 📂 **Drag & drop or click-to-upload** image input (max 4MB)
- 🔍 **Multi-model detection** — runs multiple AI detection models in parallel
- ⚡ **Real-time streaming** — live progress bar as each model completes
- 🪟 **Modal result view** — image preview + verdict displayed in a clean dialog
- 🎨 **Violet-themed dark UI** built with Tailwind CSS v4 + shadcn/ui
- 📱 Responsive layout for desktop and mobile

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js](https://nextjs.org/) (App Router) |
| Language | TypeScript |
| Styling | [Tailwind CSS v4](https://tailwindcss.com/) |
| UI Components | [shadcn/ui](https://ui.shadcn.com/) |
| HTTP Client | [Axios](https://axios-http.com/) / Fetch API (SSE streaming) |
| File Upload | [react-dropzone](https://react-dropzone.js.org/) |
| Icons | [Lucide React](https://lucide.dev/) |
| Backend / Model API | [Hugging Face Spaces](https://huggingface.co/spaces) |

---

## 📁 Folder Structure

```
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page
│   └── globals.css         # Global styles (scrollbar, base styles)
│
├── components/
│   ├── UploadForm.tsx      # Main upload + detection trigger component
│   ├── DetectionModal.tsx  # Modal showing progress bar and results
│   └── ui/                 # shadcn/ui primitives (Button, Dialog, etc.)
│
├── lib/
│   └── utils.ts            # cn() utility and shared helpers
│
├── public/                 # Static assets
├── next.config.ts
├── tailwind.config.ts
└── tsconfig.json
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js `18+`
- npm / yarn / pnpm

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/riteshpoudel201/is-this-ai-frontend.git
cd is-this-ai-frontend

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm run start
```

---

## 🔗 Backend

This frontend connects to a hosted **Hugging Face Space** that exposes a streaming detection endpoint:

```
POST https://riteshpoudel34-is-this-ai.hf.space/detect/stream
```

The endpoint accepts `multipart/form-data` with a `file` field and responds with a Server-Sent Events (SSE) stream emitting `progress`, `model_done`, and `done` events.

> The backend runs independently. No environment variables are required to run the frontend locally.

---

## 📄 License

MIT
