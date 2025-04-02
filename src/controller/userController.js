const { json } = require('body-parser');
const User = require('../models/userModel');
const logger = require('../utils/logger')

exports.findOne = (req,res)=>{
    User.findOne('1', (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            // res.status(404).send({
            //     message: `Not found Customer with id ${req.params.uid}.`
            // });
          } else {
            // res.status(500).send({
            //     message: "Error retrieving Customer with id " + req.params.uid
            // });
          }
        } else {
            res.send(JSON.stringify(data));
        }
    });
};


exports.createToken = (req, res) => {
    User.createToken(req.body, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                
            } else {
            }
        } else {
            res.send(data);
        }
    });
}

// id로 조회
exports.findAllDataByUser = (req,res)=>{
    User.findAllById(req.params.uid, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                message: `Not found Customer with id ${req.params.uid}.`
                });
            } else {
                res.status(500).send({
                message: "Error retrieving Customer with id " + req.params.uid
                });
            }
        } else {
            console.log(JSON.stringify(data))
            res.send(JSON.stringify(data));
        }
      });
};

