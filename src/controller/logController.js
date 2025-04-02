const Log = require('../models/logModel');

exports.create = (req, res) => {
    // if (!req.body) {
    //     res.status(400).send({
    //       message: "Content can not be empty!"
    //     });
    //   }
    console.log('**** log model4 : ', req)

    Log.create(req.body, (err) => {
        if (err) {
            res.status(500).send({
                message: 'ddd'
            });
        };
    });
};

exports.logGet = (req, res) => {
    // if (!req.body) {
    //     res.status(400).send({
    //       message: "Content can not be empty!"
    //     });
    //   }
    console.log('**** log get : ', req)
};
