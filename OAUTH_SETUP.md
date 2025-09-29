# OAuth Setup Guide for Monchee

This guide will help you configure Google and GitHub OAuth providers in Clerk for the Monchee application.

## Prerequisites

1. A Clerk account (sign up at [clerk.com](https://clerk.com))
2. A Google Cloud Console account
3. A GitHub account

## 1. Clerk Configuration

### Step 1: Create a Clerk Application
1. Go to [clerk.com](https://clerk.com) and sign in
2. Click "Add application"
3. Choose "Next.js" as your framework
4. Name your application "Monchee"
5. Copy the API keys to your `.env.local` file

### Step 2: Configure OAuth Providers

#### Google OAuth Setup
1. In your Clerk dashboard, go to "Authentication" → "Social connections"
2. Click "Add connection" and select "Google"
3. You'll need to create a Google OAuth app:
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing one
   - Enable Google+ API
   - Go to "Credentials" → "Create credentials" → "OAuth 2.0 Client ID"
   - Set application type to "Web application"
   - Add authorized redirect URIs:
     - `https://your-clerk-domain.clerk.accounts.dev/v1/oauth_callback`
   - Copy the Client ID and Client Secret
4. Back in Clerk, paste the Google Client ID and Client Secret
5. Save the configuration

#### GitHub OAuth Setup
1. In your Clerk dashboard, go to "Authentication" → "Social connections"
2. Click "Add connection" and select "GitHub"
3. You'll need to create a GitHub OAuth app:
   - Go to [GitHub Settings](https://github.com/settings/developers)
   - Click "New OAuth App"
   - Set Application name: "Monchee"
   - Set Homepage URL: `http://localhost:3000` (for development)
   - Set Authorization callback URL: `https://your-clerk-domain.clerk.accounts.dev/v1/oauth_callback`
   - Copy the Client ID and Client Secret
4. Back in Clerk, paste the GitHub Client ID and Client Secret
5. Save the configuration

## 2. Environment Variables

Update your `.env.local` file with the correct Clerk keys:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_actual_publishable_key
CLERK_SECRET_KEY=sk_test_your_actual_secret_key

# Clerk URLs
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

# Clerk SSO Callback URLs
NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL=/sign-in/sso-callback
NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL=/sign-up/sso-callback
```

## 3. Testing the Setup

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Visit `http://localhost:3000/sign-in` to test the sign-in page
3. Visit `http://localhost:3000/sign-up` to test the sign-up page
4. Test each OAuth provider:
   - Click "Continue with Google" and complete the OAuth flow
   - Click "Continue with GitHub" and complete the OAuth flow
   - Test email/password sign-up and sign-in

## 4. Features Implemented

### ✅ Social Login Integration
- Google OAuth provider
- GitHub OAuth provider
- Email/Password authentication
- Seamless account linking

### ✅ Enhanced User Experience
- Social avatars automatically populated
- Username generation from social accounts
- Provider badges in profiles and community
- Responsive design for all screen sizes

### ✅ Profile Management
- Social account data extraction
- Provider-specific icons and labels
- Enhanced profile pages with social integration
- Community leaderboard with social avatars

### ✅ Navigation Updates
- Conditional rendering based on auth state
- Social account information in dropdown
- Community link in navigation
- Mobile-friendly responsive design

## 5. Troubleshooting

### Common Issues

1. **"Invalid redirect URI" error**
   - Ensure the redirect URI in your OAuth app matches exactly with Clerk's callback URL
   - Check for trailing slashes and protocol (https vs http)

2. **"Client ID not found" error**
   - Verify the Client ID and Secret are correctly copied
   - Ensure the OAuth app is properly configured in Google/GitHub

3. **"CORS error" in development**
   - Make sure you're using `http://localhost:3000` in your OAuth app settings
   - For production, update to your actual domain

4. **Social avatars not showing**
   - Check if the social account has a profile picture
   - Verify the image URL is accessible

### Development vs Production

- **Development**: Use `http://localhost:3000` in OAuth app settings
- **Production**: Update OAuth app settings with your production domain
- **Clerk**: Update allowed origins in Clerk dashboard for production

## 6. Next Steps

Once OAuth is working:
1. Test the complete user flow from sign-up to profile
2. Verify social avatars appear correctly
3. Test the community leaderboard
4. Ensure mobile responsiveness
5. Deploy to production and update OAuth settings

## Support

If you encounter issues:
1. Check Clerk's documentation: [clerk.com/docs](https://clerk.com/docs)
2. Verify OAuth app configurations
3. Check browser console for errors
4. Ensure all environment variables are set correctly
