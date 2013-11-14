module.exports = function() {

    this.replaceUnderscoreId = function(obj) {
        if (obj._id) {
            obj.id = obj._id;
            delete obj["_id"];
        }
    };

    this.replaceId = function(obj) {
        if (obj.id) {
            obj._id = obj.id;
            delete obj["id"];
        }
    };

};