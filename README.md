
  # EXCHKR

  This is a code bundle for EXCHKR. The original project is available at https://www.figma.com/design/FesBG50rfmsE2MQeaWjAoJ/EXCHKR-beta--Copy-.

  ## Running the code

  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server.

  ## Waitlist Email Setup

  The waitlist feature sends all submissions directly to your email address using EmailJS.

  ### Quick Setup:

  1. Create a free EmailJS account at https://www.emailjs.com
  2. Follow the detailed instructions in `EMAILJS_SETUP.md`
  3. Update your `.env` file with your EmailJS credentials and recipient email
  4. Restart your dev server

  ### How it works:
  - When someone fills out the form and clicks "Join the Waitlist", their information is sent directly to your email
  - Each submission arrives as a separate email with all the user's details
  - No database or Excel files needed - everything goes straight to your inbox
  