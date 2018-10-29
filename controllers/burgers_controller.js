var express = require("express");
var router = express.Router();

var models = require('../models'); 

var sequelizeConnection = models.sequelize;

// Sync tables
sequelizeConnection.sync();


// Routes----

// redirect
router.get("/", function(req, res) {
  res.redirect("/burgers");
});

// Index Page
router.get("/burgers", function(req, res) {
  console.log("HEEREEEEE")

  // Sequelize Query to get burgers from database
  models.burgers.findAll({
  }).then(function(data){
    var hbsObject = { burgers: data };
    res.render("index", hbsObject);
  });
});

// Create Burger
router.post("/burgers/create", function(req, res) {
  models.burgers.create(
    {
      burger_name: req.body.burger_name,
      devoured: false
    }
  ).then(function(){
    // burger added to the database, refresh page
    res.redirect('/burgers');
  });
});

// eat burger
router.post('/burgers/eat/:id', function (req, res) {

  if(req.body.burgerEater == "" || req.body.burgerEater == null){
    req.body.burgerEater = "Anonymous";
  }


  // create a new burger devourer / id
  models.devourers.create({
    devourer_name: req.body.burgerEater,
    burgerId: req.params.id
  })

  // select the eaten burger by it's id
  .then(function(newDevourer){

    models.burgers.findOne( {where: {id: req.params.id} } )

    .then(function(eatenBurger){
      // Update status to devoured
      eatenBurger.update({
        devoured: true,
      })

      // Then, the burger is devoured, so refresh the page
      .then(function(){
        res.redirect('/burgers');
      });
    });
  });
});

module.exports = router;