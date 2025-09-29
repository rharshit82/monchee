export interface SocialUserData {
  username: string;
  avatar: string | null;
  displayName: string;
  email: string;
  provider: 'google' | 'github' | 'email';
}

export function extractSocialUserData(user: any): SocialUserData {
  const primaryEmail = user.emailAddresses?.find((email: any) => email.id === user.primaryEmailAddressId);
  const email = primaryEmail?.emailAddress || '';
  
  // Check for GitHub account
  const githubAccount = user.externalAccounts?.find((account: any) => account.provider === 'github');
  if (githubAccount) {
    const githubUsername = githubAccount.username || '';
    
    return {
      username: githubUsername || user.username || user.id,
      avatar: githubAccount.imageUrl || user.imageUrl,
      displayName: `${user.firstName || ''} ${user.lastName || ''}`.trim() || githubUsername || email.split('@')[0],
      email,
      provider: 'github'
    };
  }
  
  // Check for Google account
  const googleAccount = user.externalAccounts?.find((account: any) => account.provider === 'google');
  if (googleAccount) {
    const googleUsername = googleAccount.username || email.split('@')[0];
    
    return {
      username: googleUsername || user.username || user.id,
      avatar: googleAccount.imageUrl || user.imageUrl,
      displayName: `${user.firstName || ''} ${user.lastName || ''}`.trim() || googleUsername,
      email,
      provider: 'google'
    };
  }
  
  // Default to email/password account
  const emailUsername = email.split('@')[0];
  
  return {
    username: user.username || emailUsername || user.id,
    avatar: user.imageUrl,
    displayName: `${user.firstName || ''} ${user.lastName || ''}`.trim() || emailUsername,
    email,
    provider: 'email'
  };
}

export function getProviderIcon(provider: string) {
  switch (provider) {
    case 'github':
      return '🐙';
    case 'google':
      return '🔍';
    default:
      return '📧';
  }
}

export function getProviderName(provider: string) {
  switch (provider) {
    case 'github':
      return 'GitHub';
    case 'google':
      return 'Google';
    default:
      return 'Email';
  }
}
