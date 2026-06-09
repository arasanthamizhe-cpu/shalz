# Shalz Portfolio — ennodu inainthiru

Personal portfolio website for Shalini (Shalz) — Tamil poet, podcaster, and aspiring director.

## Deploy to Vercel (step-by-step)

### Step 1 — Create a free Resend account (for emails)
1. Go to https://resend.com and sign up free
2. Click **API Keys** → **Create API Key** → copy it (starts with `re_...`)

### Step 2 — Upload to GitHub
1. Go to https://github.com and create a new repository called `shalz-portfolio`
2. Upload all the files from this folder (drag & drop or use GitHub Desktop)
3. Click **Commit changes**

### Step 3 — Deploy on Vercel
1. Go to https://vercel.com and sign up / log in with GitHub
2. Click **Add New Project** → import your `shalz-portfolio` repo
3. Click **Deploy** (default settings are fine)

### Step 4 — Add your email API key
1. In your Vercel project, go to **Settings → Environment Variables**
2. Add a new variable:
   - **Name:** `RESEND_API_KEY`
   - **Value:** paste the key you copied from Resend (the `re_...` key)
3. Click **Save**
4. Go to **Deployments** → click the three dots on the latest deploy → **Redeploy**

That's it! The contact form will now send emails directly to ramachndranshalini@gmail.com.

## Project structure

```
shalz-portfolio/
├── public/
│   └── index.html        ← the full website
├── api/
│   └── contact.js        ← serverless email API
├── vercel.json           ← Vercel routing config
├── package.json
└── README.md
```

## How the email works
- Visitor fills the contact form → clicks Send
- Browser POSTs to `/api/contact`
- Serverless function calls Resend API
- Email lands in ramachndranshalini@gmail.com with the visitor's name, email, and message
- Shalini can reply directly from Gmail
