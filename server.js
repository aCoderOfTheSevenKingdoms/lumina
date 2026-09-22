import "dotenv/config";
import app from "./src/app.js";
import connectDatabase from "./src/config/database.js";

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDatabase();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();
