const db = require("../models");
const Movie = db.movies; 

  // Création d'un film
  const movie = new Movie({
    name: req.body.name,
    genre: req.body.genre,
    released: req.body.released ? req.body.released : false,
  });

// Enregistrement d'un nouveau film
exports.create = (req, res) => {
  
  if (!req.body.name) {
    res.status(400).send({ message: "Saisissez quelque chose !" });
    return;
  }

  // Enregistrer le film dans la base de données
  movie
    .save(movie)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Film non créé suite à une erreur.",
      });
    });
};

// Affichage  des films 
exports.findAll = (req, res) => {
  const name = req.query.name;
  let condition = name
    ? { name: { $regex: new RegExp(name), $options: "i" } }
    : {};
  Movie.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Erreur!.",
      });
    });
};

// Affichage d'un film spécifique (Par id)
exports.findOne = (req, res) => {
  const id = req.params.id;
  Movie.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: `Aucun film trouvé avec l'identifiant ${id}` });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: `Erreur d'affichage du film ${id}` });
    });
};



// Modifier un film spécifique
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Saisissez quelque chose !",
    });
  }
  const id = req.params.id;
  Movie.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Erreur de mise à jour, le film ${id} est introuvable !`,
        });
      } else res.send({ message: "Mise à jour effectuée avec succès." });
    })
    .catch(err => {
      res.status(500).send({
        message: `Erreur lors de la mise à jour du film ${id}`,
      });
    });
};



// Suppression d'un film spécifique
exports.delete = (req, res) => {
  const id = req.params.id;
  Movie.findByIdAndDelete(id)
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Impossible de supprimer le film  ${id}.`,
        });
      } else {
        res.send({
          message: "Suppression effectuée avec succès !",
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: `Suppression impossible.`,
      });
    });
};