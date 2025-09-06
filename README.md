My personal portfolio website, built with [Next.js](https://nextjs.org/), [Tailwind CSS](https://tailwindcss.com/). Showcasing my journey as a full-stack developer with expertise in web development, machine learning, and computer vision.

It is designed as a **modern, responsive portfolio template** that can be easily customized for other developers. Data about user and projects are managed through a simple JSON configuration file and GitHub API integration.

## Tech Stack
- **Framework**: [Next.js](https://nextjs.org/)
- **Deployment**: [Vercel](https://vercel.com)
- **Styling**: [Tailwind CSS](https://tailwindcss.com)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Data Management**: JSON configuration with GitHub API integration

## Portfolio Features

The portfolio showcases comprehensive information across multiple sections:

### Personal Information
- **Dynamic introduction** with name, bio, and current focus
- **Professional tagline** and personal interests
- **Contact information** with email and LinkedIn integration
- **Live statistics** showing projects completed, years of experience, and technologies used

### Skills & Technologies
- **Categorized skill display**: Frontend, Backend, Tools, and Currently Learning
- **Color-coded badges** with hover animations
- **Technology proficiency** across web development, machine learning, and computer vision

### Experience Showcase
- **Project timeline** with detailed descriptions
- **Technology stack** for each project including:
  - Web applications (HTML, CSS, JavaScript)
  - Face detection attendance systems (Node.js, MySQL, Computer Vision)
  - CNN models for image classification (Python, TensorFlow)
  - Hand gesture-controlled games (OpenCV, MediaPipe)
  - OCR text detection systems (Tesseract, Python)
  - AI-powered health applications (Next.js, TypeScript, Gemini)

### GitHub Integration (Optional)
- **Repository information** from GitHub API
- **Project analytics** and deployment status
- **Automated project detection** and categorization

### Design Features
- **Glassmorphism UI** with backdrop blur effects
- **Dark/Light mode** support
- **Responsive design** optimized for all device sizes
- **Smooth animations** and hover effects
- **Modern gradient styling** and interactive elements

## Running Locally

```sh
git clone https://github.com/HarehKen/portfolio.git
cd portfolio
```

### Environment Variables
Create a `.env.local` file:
```sh
# Optional: For GitHub API integration
GH_TOKEN=YOUR_GITHUB_TOKEN

# Optional: For Vercel project information
VC_TOKEN=YOUR_VERCEL_TOKEN
```

Then install dependencies and run the development server:
```sh
# Install dependencies
npm install

# Start development server
npm run dev
```

### Customization
Edit `data.json` to customize with your personal information:
- Personal details (name, email, LinkedIn)
- Bio information and current focus
- Skills and technologies
- Work experience and projects
- Statistics and achievements

## Deployment

The easiest way to deploy is using Vercel:

1. Fork this repository
2. Connect your GitHub account to Vercel
3. Import your forked repository
4. Add environment variables (optional)
5. Deploy!

## Customization Guide

### To personalize your portfolio:
- [ ] Update `data.json` with your information
- [ ] Replace avatar and favicon in `public/` directory  
- [ ] Modify `app/layout.jsx` metadata (title, description)
- [ ] Update repository links and demo URLs
- [ ] Customize color schemes in component files
- [ ] Add your own projects and experiences

### Key Files to Modify:
- `data.json` - All personal information and content
- `app/layout.jsx` - Site metadata and SEO
- `public/favicon.ico` - Site favicon
- Component files in `/components` - Styling and layout customization

## Project Structure
```
portfolio/
├── app/                 # Next.js app directory
├── components/          # React components
├── public/             # Static assets
├── data.json           # Portfolio content
└── README.md
```

## Features Showcase
- 🎨 Modern glassmorphism design
- 🌙 Dark/Light mode toggle
- 📱 Fully responsive layout
- ⚡ Fast performance with Next.js
- 🔍 SEO optimized
- 🎯 Easy customization through JSON
- 🚀 One-click Vercel deployment

## License
This project is open source and available under the [MIT License](LICENSE).

---

Built with ❤️ by [Hareshwar](https://github.com/HarehKen) - Feel free to fork and make it your own!