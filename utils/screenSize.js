export const isSmallScreen = () => {
  if (typeof window !== 'undefined') {
    return window.matchMedia('(max-width: 600px)').matches;
  }
  return false;
};
