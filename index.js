require("dotenv").config();
const App = process.env.NODE_ENV === 'production' ? require("./build/app") : require("./src/app");

App();