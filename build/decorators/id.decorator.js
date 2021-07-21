"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ID = void 0;
const constants_1 = require("../constants");
function ID() {
    return (_, propertyKey) => {
        Reflect.defineMetadata(constants_1.MUPI_MODEL_ITEM_ID, propertyKey, _);
    };
}
exports.ID = ID;
//# sourceMappingURL=id.decorator.js.map