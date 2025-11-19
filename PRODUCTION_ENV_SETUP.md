# Production Environment Variables Setup

## The Problem
Your `.env` file works locally but **NOT in production**. Environment variables need to be set in your deployment platform (Vercel, Netlify, etc.) because:
- `.env` files are NOT deployed to production (they're in `.gitignore`)
- Vite needs environment variables at **build time** in production
- Each deployment platform has its own way to set environment variables

## Quick Fix: Add Environment Variables to Your Deployment Platform

### For Vercel (Most Common)

1. **Go to your Vercel Dashboard:**
   - Visit https://vercel.com
   - Sign in and select your project

2. **Navigate to Environment Variables:**
   - Click on your project
   - Go to **Settings** → **Environment Variables**

3. **Add these 4 variables:**
   
   Click "Add New" for each one:

   | Variable Name | Value |
   |--------------|-------|
   | `VITE_EMAILJS_SERVICE_ID` | `service_d9ky1jk` |
   | `VITE_EMAILJS_TEMPLATE_ID` | `template_ro01fqv` |
   | `VITE_EMAILJS_PUBLIC_KEY` | `xOGyQ5ybzgfuOliAX` |
   | `VITE_WAITLIST_RECIPIENT_EMAIL` | `smbenoit6@gmail.com` |

4. **Important Settings:**
   - **Environment**: Select "Production", "Preview", and "Development" (or just "Production" if you only want it for production)
   - Click "Save" after each variable

5. **Redeploy:**
   - Go to **Deployments** tab
   - Click the "..." menu on your latest deployment
   - Click **"Redeploy"**
   - OR push a new commit to trigger a new deployment

### For Netlify

1. **Go to your Netlify Dashboard:**
   - Visit https://app.netlify.com
   - Sign in and select your site

2. **Navigate to Environment Variables:**
   - Go to **Site Settings** → **Environment Variables**

3. **Add the same 4 variables** as above:
   - Click "Add a variable"
   - Add each variable name and value
   - Click "Save"

4. **Redeploy:**
   - Go to **Deployments** tab
   - Click "Trigger deploy" → "Deploy site"
   - OR push a new commit

### For Cloudflare Pages

1. **Go to Cloudflare Dashboard:**
   - Visit https://dash.cloudflare.com
   - Go to **Workers & Pages** → Your project

2. **Navigate to Environment Variables:**
   - Go to **Settings** → **Environment Variables**

3. **Add the same 4 variables** as above

4. **Redeploy:**
   - Go to **Deployments** tab
   - Click "Retry deployment" on the latest deployment

### For Other Platforms

The process is similar:
1. Find "Environment Variables" or "Config Vars" in your platform's settings
2. Add all 4 variables with the `VITE_` prefix
3. Redeploy your site

## Verify It's Working

After redeploying:

1. **Wait for deployment to complete** (usually 1-2 minutes)
2. **Visit your live website**
3. **Hard refresh** (Cmd+Shift+R or Ctrl+Shift+R)
4. **Fill out the waitlist form**
5. **Submit and check** `smbenoit6@gmail.com`

## Important Notes

- ✅ Environment variables with `VITE_` prefix are exposed to the browser (this is expected for EmailJS)
- ✅ Never commit your `.env` file to Git (it's already in `.gitignore`)
- ✅ Each deployment platform needs these variables set separately
- ✅ You must **redeploy** after adding environment variables for them to take effect
- ⚠️ The variables are case-sensitive - use exact names as shown above

## Troubleshooting

**Still getting "EmailJS is not configured" error?**

1. ✅ Verify all 4 variables are set in your deployment platform
2. ✅ Make sure variable names start with `VITE_`
3. ✅ Check that you redeployed after adding the variables
4. ✅ Hard refresh your browser (Cmd+Shift+R)
5. ✅ Check browser console for the "Environment Variables Check:" log message

**Variables not showing up?**

- Some platforms require you to rebuild/redeploy after adding variables
- Try triggering a new deployment manually
- Check that variable names match exactly (case-sensitive)

