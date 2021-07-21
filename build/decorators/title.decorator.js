"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Title = void 0;
const constants_1 = require("../constants");
function Title(title) {
    return (property) => {
        const titleOptions = title || {};
        const titleFromOption = (titleOptions && titleOptions.title)
            || (typeof title === 'string' && title)
            || property.name;
        const titleMetadata = {
            title: titleFromOption,
        };
        if (titleOptions.subtitle)
            titleMetadata.subtitle = titleOptions.subtitle;
        Reflect.defineMetadata(constants_1.MUPI_MODEL_TITLE, titleMetadata, property);
    };
}
exports.Title = Title;
//# sourceMappingURL=title.decorator.js.map