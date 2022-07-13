export const getPlanetIdFromUrl = (url: string): string => {
  const splittedUrl = url.split("/").filter(Boolean);
  return splittedUrl[splittedUrl.length - 1];
};
