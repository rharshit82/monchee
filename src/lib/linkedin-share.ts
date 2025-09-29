export const shareToLinkedIn = (url: string, title: string, summary: string, source: string) => {
  const linkedinUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}&summary=${encodeURIComponent(summary)}&source=${encodeURIComponent(source)}`;
  window.open(linkedinUrl, '_blank', 'width=600,height=400');
};
