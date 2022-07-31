"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.utils = void 0;
exports.utils = {
    now: () => {
        const d = new Date();
        return d.getTime();
    },
    deepCopy: (o) => JSON.parse(JSON.stringify(o))
};
//# sourceMappingURL=utils.js.map