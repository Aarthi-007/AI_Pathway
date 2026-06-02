# AI Roadmap Generator - Setup & Troubleshooting Guide

## 🔍 Issues Found and Fixed

### 1. **Google Sign-In Not Working**
**Problem:** The application was using Firebase's Google authentication with `signInWithPopup()`, but it wasn't properly integrated and required complex Firebase configuration.

**Solution:** Replaced Firebase authentication with **Clerk**, which provides:
- ✅ Easy Google sign-in integration
- ✅ Multiple auth methods (Google, GitHub, Email, etc.)
- ✅ Better error handling
- ✅ Built-in user management
- ✅ Simplified setup process

### 2. **Roadmap Generation Failing with Generic Error**
**Problem:** The error "Failed to generate roadmap. Please try again." was not helpful for debugging.

- Missing or invalid VITE_FEATHERLESS_API_KEY
- API rate limiting
- Invalid model names
- Network issues
- Response parsing failures

**Solution:** 
- Added detailed error logging in `geminiService.ts`
- Implemented specific error messages for different failure scenarios
- Added validation checks for API key
- Now displays actual error message to user instead of generic message

---

## 🚀 Setup Instructions

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Set Up Clerk Authentication

1. Go to [Clerk Dashboard](https://dashboard.clerk.com)
2. Sign up or log in
3. Create a new application
4. Select your authentication methods (Google, Email, etc.)
5. Go to **API Keys** in the sidebar
6. Copy your **Publishable Key**
7. Paste it in `.env.local`:
   ```
   VITE_CLERK_PUBLISHABLE_KEY=pk_test_your_key_here
   ```

### Step 3: Set Up Featherless API

1. Go to your Featherless provider dashboard
2. Click "Get API Key"
3. Copy the key
4. Paste it in `.env.local`:
   ```
   VITE_FEATHERLESS_API_KEY=your_featherless_api_key_here
   ```

### Step 4: Configure Environment Variables

Create or update `.env.local` in the project root:

```env
# Required: Featherless API Key
VITE_FEATHERLESS_API_KEY=your_featherless_api_key_here

# Required: Clerk Publishable Key
VITE_CLERK_PUBLISHABLE_KEY=pk_test_your_publishable_key_here

# Optional: Clerk Secret Key (for backend operations)
CLERK_SECRET_KEY=sk_test_your_secret_key_here
```

### Step 5: Start the Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:3000`

---

## 🔧 Troubleshooting

### "VITE_FEATHERLESS_API_KEY is not set" Error
**Solution:**
1. Check that `VITE_FEATHERLESS_API_KEY` is set in `.env.local`
2. Ensure the key is valid (not expired)
3. Restart the dev server after updating `.env.local`
4. Check the browser console (F12) for the exact error

### "No response text received from Featherless API" Error
**Solution:**
1. Verify your API key is valid
2. Check if you've exceeded API quota
3. Try a simpler query (e.g., "Python")
4. Check network connectivity

### "Failed to parse Featherless API response" Error
**Solution:**
1. This means the API returned invalid JSON
2. Check if the API is rate limiting (429 error)
3. Try again with a different model (fast vs. deep mode)
4. Check the browser console for full error details

### Authentication Not Working
**Solution:**
1. Verify `VITE_CLERK_PUBLISHABLE_KEY` is set correctly
2. Go to Clerk dashboard and check if Google is enabled as a provider
3. Clear browser cache (Ctrl+Shift+Delete)
4. Restart the dev server
5. Check browser console for specific auth errors

### History Not Loading After Sign In
**Solution:**
1. Check that Firebase Firestore is properly configured
2. Ensure firestore.rules allows reads/writes
3. Check browser console for Firestore errors
4. Verify your Firestore database is in "Test" mode or has proper security rules

---

## 📁 File Changes Summary

### Modified Files:
1. **`src/main.tsx`** - Added ClerkProvider wrapper
2. **`src/App.tsx`** - Replaced Firebase auth with Clerk
3. **`src/firebase.ts`** - Removed Firebase auth (kept only Firestore)
4. **`src/services/geminiService.ts`** - Added detailed error handling and logging
5. **`.env.example`** - Updated with Clerk configuration
6. **`.env.local`** - New file with setup instructions

### New Files:
- **`SETUP_GUIDE.md`** (this file)

---

## 🎯 Key Changes Made

### Authentication Flow
**Before:**
- Firebase Google Auth → Complex setup, OAuth consent screen issues

**After:**
- Clerk handles all auth → Simple setup, multiple providers available

### Error Handling
**Before:**
```javascript
setError('Failed to generate roadmap. Please try again.');
```

**After:**
```javascript
   if (error.message.includes("API key")) {
      throw new Error("Authentication failed. Please check your VITE_FEATHERLESS_API_KEY.");
   }
if (error.message.includes("429")) {
  throw new Error("API rate limit exceeded. Please try again in a few moments.");
}
```

---

## 📝 Environment Variables Reference

| Variable | Type | Required | Description |
|----------|------|----------|-------------|
| `VITE_FEATHERLESS_API_KEY` | String | Yes | Featherless API Key for roadmap generation |
| `VITE_CLERK_PUBLISHABLE_KEY` | String | Yes | Clerk authentication public key |
| `CLERK_SECRET_KEY` | String | No | Clerk secret key (backend only) |
| `VITE_APP_URL` | String | No | Your app's deployment URL |

---

## 🧪 Testing the Setup

1. **Test Authentication:**
   - Click "Sign In" button
   - Select "Continue with Google"
   - Verify you can sign in successfully

2. **Test Roadmap Generation:**
   - Enter a learning goal (e.g., "Python Programming")
   - Select a knowledge level
   - Click "Generate Roadmap"
   - You should see detailed error if something fails

3. **Check Console for Errors:**
   - Press F12 to open Developer Tools
   - Go to "Console" tab
   - Try generating a roadmap
   - Check for detailed error messages

---

## 🆘 Getting Help

If you encounter issues:

1. **Check the browser console (F12)** for detailed error messages
2. **Check the Network tab** in DevTools to see API calls
3. **Verify all environment variables** are set correctly
4. **Restart the dev server** after making changes to `.env.local`
5. **Clear browser cache** to remove stale data

---

## 📚 Documentation Links

- [Clerk Documentation](https://clerk.com/docs)
- [Featherless API](https://your-featherless-provider.example/)
- [Firebase Firestore](https://firebase.google.com/docs/firestore)
- [Vite Environment Variables](https://vitejs.dev/guide/env-and-modes.html)

---

**Last Updated:** May 16, 2026
