# Quick Start Guide - AI Roadmap Generator

## ⚡ 5-Minute Setup

### Step 1: Get Clerk Publishable Key (2 min)
```
1. Go to https://dashboard.clerk.com
2. Click "Create application"
3. Select authentication methods (leave default with Google enabled)
4. Click "Create"
5. In the left sidebar, click "API Keys"
6. Copy the "Publishable Key" (starts with pk_)
```

### Step 2: Get Featherless API Key (2 min)
```
1. Go to your Featherless provider dashboard
2. Click "Get API Key" or equivalent
3. Copy the API key that appears
```

### Step 3: Configure Environment (1 min)
```
1. Open .env.local in the project root
2. Replace "pk_test_your_publishable_key_here" with your Clerk key
3. Replace "MY_FEATHERLESS_API_KEY" with your Featherless key
4. Save the file
```

### Step 4: Start Development Server
```bash
npm install  # Only if not done yet
npm run dev
```

### Step 5: Test It!
- Click "Sign In"
- Sign in with Google
- Enter a learning goal (e.g., "Python Programming")
- Click "Generate Roadmap"
- Done! 🎉

---

## 🛠️ Troubleshooting Quick Fixes

### ❌ "VITE_FEATHERLESS_API_KEY is not set"
```
→ Make sure VITE_FEATHERLESS_API_KEY is in .env.local
→ Restart npm run dev after editing .env.local
→ Check that the value is not empty
```

### ❌ "Sign In Not Working"  
```
→ Check VITE_CLERK_PUBLISHABLE_KEY is correct in .env.local
→ Verify key starts with "pk_"
→ Go to Clerk dashboard and enable Google provider
→ Clear browser cache (Ctrl+Shift+Delete)
```

### ❌ "Failed to generate roadmap"
```
→ Check browser console (F12) for the actual error
→ Verify both API keys are set in .env.local
→ Make sure you're signed in
→ Wait a moment and try again (may be rate limited)
```

### ❌ Other Issues
```
→ Always check browser console (F12) first
→ Look for error messages that start with "Error:"
→ Copy the full error message
→ Check SETUP_GUIDE.md for more details
```

---

## 📚 File Locations

```
.env.local ..................... Your configuration
.env.example ................... Template (don't edit)
SETUP_GUIDE.md ................. Detailed setup guide
FIX_SUMMARY.md ................. What was fixed
src/App.tsx .................... Main app (uses Clerk now)
src/services/geminiService.ts .. AI generation (error handling)
```

---

## 🧪 Verify Everything Works

| Test | Steps | Success Criteria |
|------|-------|-----------------|
| **Environment** | Open browser console (F12) | No red errors |
| **Clerk** | Click "Sign In", use Google | Successfully signed in |
| **Featherless** | Generate a roadmap | Shows roadmap or helpful error |
| **Firestore** | Sign in, generate, then check history | History appears |

---

## 🎯 What Was Fixed

✅ **Google Sign-In** - Now using Clerk (much easier!)
✅ **Error Messages** - Now shows actual error, not generic message
✅ **API Validation** - Checks API key before making requests
✅ **Console Logging** - Detailed debug info in browser console

---

## 📱 Features

### After Setup, You Can:
- 🔐 Sign in with Google (via Clerk)
- 🤖 Generate learning roadmaps with AI
- 📚 View learning resources and topics
- 🎨 Analyze images with AI Lab
- 🎬 Generate images with AI Lab
- 💾 Save roadmaps to history
- 🔍 Search roadmap history

---

## ❓ Need More Help?

1. **Detailed Setup** → See SETUP_GUIDE.md
2. **What Changed** → See FIX_SUMMARY.md
3. **Browser Console** → Press F12, go to Console tab
4. **Environment Variables** → See .env.example

---

## 🔗 Useful Links

- Clerk Dashboard: https://dashboard.clerk.com
- Featherless API: https://your-featherless-provider.example/
- Firebase Firestore: https://console.firebase.google.com/
- Vite Docs: https://vitejs.dev/

---

**Ready to go! Happy learning! 🚀**
