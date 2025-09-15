const mongoose = require('mongoose');

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connecté à la bdd'))
  .catch((err) => console.error('Erreur de connexion à la bdd', err));
