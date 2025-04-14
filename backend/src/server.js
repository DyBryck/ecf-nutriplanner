import app from "./app.js";

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Serveur backend lancé sur le port ${PORT}`);
});
