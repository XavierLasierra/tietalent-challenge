export const getPlanetIdFromUrl = (url: string): string => {
  const splittedUrl = url.split("/").filter(Boolean);
  const planetId = splittedUrl[splittedUrl.length - 1];
  return planetId;
};
