export const isSmallScreen = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(max-width: 600px)').matches;
