module.exports = app => {
    app.use("/api/movies", router);
  };
  const movies = require("../controllers/controllers.js");
  let router = require("express").Router();
  
  // Créer un nouveau film
  router.post("/", movies.create);
  
  // Récupérer tous les films
  router.get("/", movies.findAll);

  // Récupérer un film spécifique
  router.get("/:id", movies.findOne);
    
  // Mettre à jour un film spécifique
  router.put("/:id", movies.update);
  
  // Supprimer un film spécifique
  router.delete("/:id", movies.delete);
  

  