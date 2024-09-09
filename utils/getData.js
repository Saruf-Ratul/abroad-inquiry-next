import "server-only";

const dataFiles = {
  services: () =>
    import("../public/data/services.json").then((module) => module.default),
};

export const getData = async (fileName) => {
  if (!dataFiles[fileName]) {
    throw new Error(`No data found for file: ${fileName}`);
  }
  return dataFiles[fileName]();
};
