"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (baseURL) => (req, res) => {
    const parsedURL = new URL(req.url, baseURL);
    const params = {};
    parsedURL.searchParams.forEach((value, key) => (params[key] = value));
    req.params = params;
    req.pathname = parsedURL.pathname;
};
