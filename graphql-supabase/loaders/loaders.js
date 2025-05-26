import createUserLoader from "./User/createUserLoader.js";

const createLoaders = () => ({
  userLoader: createUserLoader(),
});

export default createLoaders;
