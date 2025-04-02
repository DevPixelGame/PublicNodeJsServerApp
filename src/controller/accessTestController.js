const AccessTest = require('../models/accessTestModel');


// id로 조회
exports.getTest = (req,res) => {
    AccessTest.findByID(req.params.index, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found ID`
                });
            }
            else {
                res.status(500).send({
                    message: "Error retrieving Customer with id "
                });
            }
        } else {
            res.send(JSON.stringify(data));
        }
    });
};