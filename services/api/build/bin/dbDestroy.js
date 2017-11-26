"use strict";
var destroyTables = require("../lib/database").destroyTables;
destroyTables()
    .then(function () { return process.exit(); })
    .catch(function (error) {
    throw error;
});
//# sourceMappingURL=dbDestroy.js.map