const db = require('../models');




module.exports = function(app){


  app.get("/api/todos", function(req, res) {
    db.list.findAll({}).then(function(dbTodo) {
      res.json(dbTodo);
    });

  });

  app.post("/api/new", function(req, res) {
    db.list.create({
      text: req.body.text,
      complete: req.body.complete
    }).then(function(dbTodo) {
      res.json(dbTodo);
    });

  });

  app.put("/api/edit/:id", function(req, res) {
    db.list.update({
      text: req.body.text,
      complete: req.body.text
    }, {
      where: {
        id: req.params.id
      }
    })
      .then(function(dbTodo) {
        res.json(dbTodo);
      });

  });
  
  app.put("/api/todos", function(req, res) {
    db.list.update({
      complete: req.body.complete
    }, {
      where: {
        id: req.body.id
      }
    })
      .then(function(dbTodo) {
        res.json(dbTodo);
      });

  });

  app.delete("/api/delete/:id", function(req, res) {
    db.list.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(function(dbTodo) {
        res.json(dbTodo);
      });

  });
  
};
