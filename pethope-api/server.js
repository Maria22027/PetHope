const app = require("./src/app");
const connectDB = require("./src/config/database");

connectDB();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log('API rodando na porta ' + PORT);
});