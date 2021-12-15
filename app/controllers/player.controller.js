const db = require("../models");
const Player = db.players;
const Op = db.Sequelize.Op;

const LEVEL_BAR = 1000; 

// Create new player
exports.create = (req, res) => {
  if (!req.body.username || !req.body.email || !req.body.password) {
    res.status(400).json({
      result: "FAILED",
      message: "username or email or password field cannot be empty."
    });
    return;
  }

  const player = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    experience: req.body.exp ? req.body.exp : 0,
    lvl: req.body.exp ? Math.floor(req.body.exp/LEVEL_BAR) : 0
  };

  Player.create(player)
    .then(data => {
      res.status(201).json({
        result: "SUCCESS",
        message: data
      });
    })
    .catch(err => {
      res.status(500).json({
        result: "FAILED",
        message:
          err.message || "Some error occurred while creating the Player."
      });
    });
};


exports.findAll = (req, res) => {
  let conditions = []
  if (req.query.username) {
    conditions.push({ username : req.query.username});
  }
  if (req.query.email) {
    conditions.push({ email : req.query.email });
  }
  if (req.query.experience) {
    conditions.push({ experience : req.query.experience });
  }
  if (req.query.lvl) {
    conditions.push({ lvl : req.query.lvl });
  }

  Player.findAll({ 
    where: {
      [Op.and] : conditions
    } 
    })
    .then(data => {
      res.status(200).json({
        result: "SUCCESS",
        message: data
      });
    })
    .catch(err => {
      res.status(500).json({
        message:
          err.message || "Some error occurred while retrieving players."
      });
    });
};


exports.findById = (req, res) => {
  const id = req.params.id;

  Player.findByPk(id)
    .then(data => {
      res.status(200).json({
        result: "SUCCESS",
        message: data
      });
    })
    .catch(err => {
      res.status(500).json({
        result: "FAILED",
        message: "Error retrieving Player with id=" + id
      });
    });
};

exports.getExperience = (req, res) => {
  if (!req.body.exp) {
    res.status(400).json({
      result: "FAILED",
      message: "exp field cannot be empty."
    });
    return;
  }

  const id = req.params.id;

  Player.findByPk(id)
    .then(player => {
      let expValue = player.experience + parseInt(req.body.exp);
      let lvlValue = (Math.floor(expValue/LEVEL_BAR) == player.lvl) ? player.lvl : player.lvl+1;
      Player.update({ experience : expValue, lvl : lvlValue }, {
        where: { id: id }
      })
      .then(num => {
        if (num == 1) {
          res.status(200).json({
            result: "SUCCESS",
            message: `Player with id=${id} has more experience.`
          });
        } else {
          res.status(400).json({
            result: "FAILED",
            message: `Cannot update Player with id=${id}!`
          });
        }
      });   
    })
    .catch(err => {
      res.status(500).json({
        result: "FAILED",
        message: "Error updating Player exp with id=" + id
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  Player.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.status(200).json({
          result: "SUCCESS",
          message: "Player was updated successfully."
        });
      } else {
        res.status(400).json({
          result: "FAILED",
          message: `Cannot update Player with id=${id}. Maybe Player was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        result: "FAILED",
        message: "Error updating Player with id=" + id
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Player.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.status(200).json({
          result: "SUCCESS",
          message: "Player was deleted successfully!"
        });
      } else {
        res.status(400).json({
          result: "FAILED",
          message: `Cannot delete Player with id=${id}. Maybe Player was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        result: "FAILED",
        message: "Could not delete Player with id=" + id
      });
    });
};
