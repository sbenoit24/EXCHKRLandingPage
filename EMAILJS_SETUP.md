# EmailJS Setup Guide

Follow these steps to set up EmailJS so waitlist submissions are sent to your email:

## Step 1: Create an EmailJS Account

1. Go to https://www.emailjs.com
2. Click "Sign Up" (it's free)
3. Sign up with Google, GitHub, or email
4. Verify your email address if required

## Step 2: Add an Email Service

1. In your EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the connection steps for your email provider
5. Give your service a name (e.g., "Waitlist Service")
6. Click "Create Service"
7. **Copy the Service ID** - you'll need this for your `.env` file

## Step 3: Create an Email Template

1. In your EmailJS dashboard, go to "Email Templates"
2. Click "Create New Template"
3. Use the following template:

   **Template Name**: Waitlist Submission

   **Subject**: New Waitlist Submission - {{name}}

   **Content**:
   ```
   You have received a new waitlist submission:

   Name: {{name}}
   Email: {{email}}
   Club/Organization: {{club_name}}
   University: {{university}}
   Role: {{role}}
   Organization Type: {{org_type}}
   Submission Date: {{submission_date}}

   ---
   This email was sent from the EXCHKR waitlist form.
   ```

4. Click "Save"
5. **Copy the Template ID** - you'll need this for your `.env` file

## Step 4: Get Your Public Key

1. In your EmailJS dashboard, go to "Account" → "General"
2. Find your "Public Key" (also called "User ID")
3. **Copy the Public Key** - you'll need this for your `.env` file

## Step 5: Update Your .env File

Open your `.env` file and replace the placeholder values:

```
VITE_EMAILJS_SERVICE_ID=your-actual-service-id
VITE_EMAILJS_TEMPLATE_ID=your-actual-template-id
VITE_EMAILJS_PUBLIC_KEY=your-actual-public-key
VITE_WAITLIST_RECIPIENT_EMAIL=your-email@example.com
```

**Important**: Replace `your-email@example.com` with the actual email address where you want to receive waitlist submissions.

## Step 6: Restart Your Dev Server

1. Stop your current dev server (Ctrl+C)
2. Start it again:
   ```bash
   npm run dev
   ```

## Testing

1. Fill out the waitlist form on your website
2. Click "Join the Waitlist!!!"
3. Check the email address you specified in `VITE_WAITLIST_RECIPIENT_EMAIL`
4. You should receive an email with the submission details

## Troubleshooting

- **Error: "EmailJS is not configured"**: Make sure all three EmailJS values are set in your `.env` file and you've restarted the dev server
- **Error: "Failed to send email"**: Check that your EmailJS service is connected and the template ID is correct
- **Not receiving emails**: Check your spam folder and verify the recipient email address is correct

