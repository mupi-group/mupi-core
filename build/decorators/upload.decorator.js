"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Upload = void 0;
const constants_1 = require("../constants");
function Upload() {
    return (_, propertyKey) => {
        const definedMetadata = Reflect.getMetadata(constants_1.MUPI_MODEL_IF_UPLOAD, _);
        Reflect.defineMetadata(constants_1.MUPI_MODEL_IF_UPLOAD, Object.assign(Object.assign({}, definedMetadata), { [propertyKey]: true }), _);
    };
}
exports.Upload = Upload;
//# sourceMappingURL=upload.decorator.js.map