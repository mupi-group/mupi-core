"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatThenResolveMupiModelStructure = void 0;
const constants_1 = require("../constants");
function formatThenResolveMupiModelStructure(MupiModel) {
    try {
        const formatted = { items: [] };
        const { title, subtitle } = Reflect.getMetadata(constants_1.MUPI_MODEL_TITLE, MupiModel);
        const items = Reflect.getMetadata(constants_1.MUPI_MODEL_DESCRIPTION, MupiModel.prototype);
        const uploads = Reflect.getMetadata(constants_1.MUPI_MODEL_IF_UPLOAD, MupiModel.prototype);
        const id = Reflect.getMetadata(constants_1.MUPI_MODEL_ITEM_ID, MupiModel.prototype);
        formatted.title = title;
        formatted.subtitle = subtitle;
        for (const key in items) {
            formatted.items.push({
                key,
                id: key === id,
                description: items[key],
                upload: !!uploads[key],
            });
        }
        return formatted;
    }
    catch (_a) {
        return false;
    }
}
exports.formatThenResolveMupiModelStructure = formatThenResolveMupiModelStructure;
//# sourceMappingURL=format-mupi-model-structure.js.map