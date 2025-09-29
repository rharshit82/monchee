export const shareToLinkedIn = (content: {
  title: string;
  description: string;
  url?: string;
  hashtags?: string[];
}) => {
  const baseUrl = 'https://www.linkedin.com/sharing/share-offsite/';
  const params = new URLSearchParams({
    url: content.url || window.location.href,
    title: content.title,
    summary: content.description
  });

  if (content.hashtags && content.hashtags.length > 0) {
    params.append('hashtags', content.hashtags.join(','));
  }

  const linkedInUrl = `${baseUrl}?${params.toString()}`;
  window.open(linkedInUrl, '_blank', 'width=600,height=400');
};

export const getShareContent = (type: 'cheatsheet' | 'lab' | 'profile', data: any) => {
  switch (type) {
    case 'cheatsheet':
      return {
        title: `${data.title} - Monchee Cheatsheet`,
        description: `I just completed the ${data.title} cheatsheet on Monchee! 🚀 Learn system design concepts with hands-on practice.`,
        hashtags: ['SystemDesign', 'Monchee', 'TechLearning']
      };
    
    case 'lab':
      return {
        title: `${data.title} - Monchee Lab Report`,
        description: `I just completed the ${data.title} lab on Monchee! 🚀 Building real-world system design skills through hands-on practice.`,
        hashtags: ['SystemDesign', 'Monchee', 'TechLearning', 'Engineering']
      };
    
    case 'profile':
      return {
        title: `${data.username}'s Learning Journey - Monchee`,
        description: `Check out my learning progress on Monchee! Level ${data.level}, ${data.xp} XP, ${data.streak}-day streak 🔥 Building system design skills!`,
        hashtags: ['SystemDesign', 'Monchee', 'TechLearning', 'PersonalGrowth']
      };
    
    default:
      return {
        title: 'Monchee - Learn System Design by Doing',
        description: 'Learn system design through hands-on practice, real-world projects, and interactive content.',
        hashtags: ['SystemDesign', 'Monchee', 'TechLearning']
      };
  }
};
