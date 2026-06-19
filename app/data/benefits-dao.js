/* The BenefitsDAO must be constructed with a connected database object */
function BenefitsDAO(db) {

    "use strict";

    /* If this constructor is called without the "new" operator, "this" points
     * to the global object. Log a warning and call it correctly. */
    if (false === (this instanceof BenefitsDAO)) {
        console.log("Warning: BenefitsDAO constructor called without 'new' operator");
        return new BenefitsDAO(db);
    }

    const usersCol = db.collection("users");

    this.getAllNonAdminUsers = callback => {
        // mongodb v4+: find().toArray() returns a Promise; no callback argument supported
        usersCol.find({ "isAdmin": { $ne: true } }).toArray()
            .then(users => callback(null, users))
            .catch(err => callback(err, null));
    };

    this.updateBenefits = (userId, startDate, callback) => {
        // mongodb v4+: update() removed; use updateOne(). Callbacks removed: use Promise.
        usersCol.updateOne(
            { _id: parseInt(userId) },
            { $set: { benefitStartDate: startDate } }
        )
        .then(result => {
            console.log("Updated benefits");
            return callback(null, result);
        })
        .catch(err => callback(err, null));
    };
}

module.exports = { BenefitsDAO };
