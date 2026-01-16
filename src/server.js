require("dotenv").config();
const app = require("./app");

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => { 
console.log("DB_HOST:", process.env.DB_HOST);

 console.log(`API running on port ${PORT}`);
});

