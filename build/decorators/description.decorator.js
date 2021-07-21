"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Description = void 0;
const constants_1 = require("../constants");
function Description(description) {
    return (_, propertyKey) => {
        const descriptionOptions = description;
        const descriptionName = (descriptionOptions && descriptionOptions.description)
            || (typeof description === 'string' && description)
            || propertyKey;
        const definedMetadata = Reflect.getMetadata(constants_1.MUPI_MODEL_DESCRIPTION, _);
        Reflect.defineMetadata(constants_1.MUPI_MODEL_DESCRIPTION, Object.assign(Object.assign({}, definedMetadata), { [propertyKey]: descriptionName }), _);
    };
}
exports.Description = Description;
//# sourceMappingURL=description.decorator.js.map