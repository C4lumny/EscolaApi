const app = require("./app");
const { pool } = require("./database/database");
const PORT = process.env.PORT || 3000;

const main = async () => {
  try {
    await pool.connect();
    app.listen(PORT, () => {
      console.log("Server listening on PORT:", PORT);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

main();