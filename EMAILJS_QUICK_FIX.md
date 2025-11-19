# Quick Fix for EmailJS 412 Error

## The Problem
Your EmailJS template doesn't match the parameters being sent. EmailJS requires an exact match.

## The Solution

### Step 1: Update Your EmailJS Template

1. Go to https://www.emailjs.com
2. Navigate to **Email Templates**
3. Click on your template: `template_ro01fqv`
4. **Replace the entire template content** with this:

**Subject Line:**
```
New Waitlist Submission - {{name}}
```

**Email Body (Plain Text or HTML):**
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

### Step 2: Fix Gmail Authentication (IMPORTANT!)

If you see the error: **"412 Gmail_API: Request had insufficient authentication scopes"**, you need to reconnect your Gmail account:

**Fix Gmail Authentication:**
1. Go to **Email Services** → Click on `service_d9ky1jk`
2. Click **"Reconnect"** or **"Disconnect"** then **"Connect"** again
3. You'll be redirected to Google to authorize
4. **IMPORTANT**: Make sure to grant ALL requested permissions, especially:
   - ✅ Send email on your behalf
   - ✅ Read and send email
   - ✅ Manage your email
5. After reconnecting, set the **"Default Email"** or **"To Email"** field to: `smbenoit6@gmail.com`
6. Click **"Save"**

**Alternative: Use a Different Email Service**
If Gmail continues to have issues, you can:
- Switch to **Outlook/Office 365** (often more reliable)
- Use **SendGrid** or **Mailgun** (requires API key setup)
- Use **SMTP** service (requires server configuration)

### Step 3: Configure Recipient Email

**Option A - In Service Settings (Recommended):**
1. Go to **Email Services** → Click on `service_d9ky1jk`
2. Find the **"Default Email"** or **"To Email"** field
3. Set it to: `smbenoit6@gmail.com`
4. Save

**Option B - In Template Settings:**
1. In your template editor, find the **"To Email"** field
2. Set it to: `smbenoit6@gmail.com`
3. Save

### Step 4: Verify Template Variables

Make sure your template includes **EXACTLY** these 7 variables (case-sensitive, with underscores):
- `{{name}}`
- `{{email}}`
- `{{club_name}}` (with underscore, not `clubName`)
- `{{university}}`
- `{{role}}`
- `{{org_type}}` (with underscore, not `orgType`)
- `{{submission_date}}` (with underscore)

### Step 5: Test

1. Save your template
2. Go back to your website
3. Hard refresh (Cmd+Shift+R or Ctrl+Shift+R)
4. Fill out the waitlist form
5. Submit and check `smbenoit6@gmail.com`

## Common Mistakes to Avoid

❌ **DON'T** use `{{clubName}}` - use `{{club_name}}`
❌ **DON'T** use `{{orgType}}` - use `{{org_type}}`
❌ **DON'T** add extra variables that aren't being sent
❌ **DON'T** misspell variable names (they're case-sensitive)

✅ **DO** use exact variable names with underscores
✅ **DO** include all 7 variables in your template
✅ **DO** set the recipient email in service or template settings

