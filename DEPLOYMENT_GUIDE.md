# Deployment Guide for EXCHKR

This guide covers several options to deploy your Vite + React application to make it live on the web.

## Prerequisites

Before deploying, make sure you can build the project locally:

```bash
npm run build
```

This creates a `build` folder with production-ready files.

---

## Option 1: Vercel (Recommended - Easiest)

**Best for:** Quick deployment, automatic HTTPS, custom domains, zero configuration

### Steps:

1. **Push your code to GitHub** (if not already):
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```

2. **Deploy to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Sign up/login with GitHub
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Vite settings
   - Click "Deploy"

3. **Configuration:**
   - Build Command: `npm run build` (auto-detected)
   - Output Directory: `build` (auto-detected)
   - Install Command: `npm install` (auto-detected)

**Your site will be live at:** `https://your-project-name.vercel.app`

---

## Option 2: Netlify

**Best for:** Easy deployment, form handling, serverless functions

### Steps:

1. **Push your code to GitHub** (same as above)

2. **Deploy to Netlify:**
   - Go to [netlify.com](https://netlify.com)
   - Sign up/login with GitHub
   - Click "Add new site" → "Import an existing project"
   - Select your repository
   - Configure build settings:
     - Build command: `npm run build`
     - Publish directory: `build`
   - Click "Deploy site"

3. **Optional - Create `netlify.toml`** (already created for you):
   ```toml
   [build]
     command = "npm run build"
     publish = "build"
   ```

**Your site will be live at:** `https://your-project-name.netlify.app`

---

## Option 3: Cloudflare Pages

**Best for:** Fast global CDN, free tier, great performance

### Steps:

1. **Push your code to GitHub**

2. **Deploy to Cloudflare Pages:**
   - Go to [pages.cloudflare.com](https://pages.cloudflare.com)
   - Sign up/login
   - Click "Create a project" → "Connect to Git"
   - Select your repository
   - Build settings:
     - Framework preset: `Vite`
     - Build command: `npm run build`
     - Build output directory: `build`
   - Click "Save and Deploy"

**Your site will be live at:** `https://your-project-name.pages.dev`

---

## Option 4: GitHub Pages

**Best for:** Free hosting, good for open source projects

### Steps:

1. **Install gh-pages package:**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Update package.json scripts:**
   ```json
   "scripts": {
     "dev": "vite",
     "build": "vite build",
     "predeploy": "npm run build",
     "deploy": "gh-pages -d build"
   }
   ```

3. **Update vite.config.ts base path** (if deploying to a subdirectory):
   ```typescript
   export default defineConfig({
     base: '/your-repo-name/', // Replace with your repo name
     // ... rest of config
   })
   ```

4. **Deploy:**
   ```bash
   npm run deploy
   ```

5. **Enable GitHub Pages:**
   - Go to your GitHub repo → Settings → Pages
   - Source: `gh-pages` branch
   - Save

**Your site will be live at:** `https://your-username.github.io/your-repo-name`

---

## Option 5: AWS Amplify

**Best for:** AWS ecosystem integration, advanced features

### Steps:

1. **Push your code to GitHub**

2. **Deploy to AWS Amplify:**
   - Go to [aws.amazon.com/amplify](https://aws.amazon.com/amplify)
   - Sign in to AWS Console
   - Click "New app" → "Host web app"
   - Connect to GitHub and select your repo
   - Build settings (auto-detected for Vite):
     - Build command: `npm run build`
     - Output directory: `build`
   - Click "Save and deploy"

---

## Option 6: Render

**Best for:** Simple deployment, good free tier

### Steps:

1. **Push your code to GitHub**

2. **Deploy to Render:**
   - Go to [render.com](https://render.com)
   - Sign up/login with GitHub
   - Click "New" → "Static Site"
   - Connect your repository
   - Build settings:
     - Build Command: `npm run build`
     - Publish Directory: `build`
   - Click "Create Static Site"

---

## Environment Variables

If your app uses environment variables:

1. **Create `.env` file locally** (already in .gitignore)
2. **Add variables in your hosting platform:**
   - Vercel: Project Settings → Environment Variables
   - Netlify: Site Settings → Environment Variables
   - Cloudflare Pages: Settings → Environment Variables

3. **Use in code:**
   ```typescript
   import.meta.env.VITE_YOUR_VARIABLE_NAME
   ```

---

## Custom Domain Setup

All platforms support custom domains:

1. **Vercel:** Project Settings → Domains → Add domain
2. **Netlify:** Site Settings → Domain management → Add custom domain
3. **Cloudflare Pages:** Settings → Custom domains → Set up custom domain

Follow the DNS configuration instructions provided by each platform.

---

## Continuous Deployment

All platforms above support automatic deployments:
- Every push to `main` branch triggers a new deployment
- Pull requests can create preview deployments
- Configure in your platform's settings

---

## Recommended Choice

**For beginners:** Start with **Vercel** - it's the easiest and has the best developer experience.

**For performance:** **Cloudflare Pages** offers excellent global CDN performance.

**For free hosting:** **Netlify** or **Cloudflare Pages** both have generous free tiers.

---

## Troubleshooting

### Build fails:
- Check that all dependencies are in `package.json`
- Ensure `npm run build` works locally first
- Check build logs in your hosting platform

### Routes not working:
- For client-side routing, configure redirects:
  - **Netlify:** Create `public/_redirects` with `/* /index.html 200`
  - **Vercel:** Create `vercel.json` with rewrite rules
  - **Cloudflare Pages:** Configure redirects in dashboard

### Assets not loading:
- Check that `base` path in `vite.config.ts` is correct
- Ensure asset paths are relative

---

## Need Help?

- Vercel Docs: https://vercel.com/docs
- Netlify Docs: https://docs.netlify.com
- Cloudflare Pages Docs: https://developers.cloudflare.com/pages

