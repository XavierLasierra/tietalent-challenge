// Workaround on getting an id for the planet object
export const getPlanetIdFromUrl = (url: string): string => {
  const splittedUrl = url.split("/").filter(Boolean);
  return splittedUrl[splittedUrl.length - 1];
};
