"use strict";
var store = require("../../../lib/database/store");
module.exports = function (obj, _a) {
    var id = _a.id;
    return store.find("user", id);
};
//# sourceMappingURL=userById.js.map