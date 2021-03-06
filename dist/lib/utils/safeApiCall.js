"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = require("lodash");
var lru_map_1 = require("./lru_map");
function safeApiCall(client, method, formatter) {
    var args = [];
    for (var _i = 3; _i < arguments.length; _i++) {
        args[_i - 3] = arguments[_i];
    }
    return cache(method, args, client[method].apply(client, args).then(function (response) {
        return Promise.resolve(!!formatter ? formatter(response) : response.body);
    }));
}
exports.safeApiCall = safeApiCall;
var cacheMap = new lru_map_1.LRUMap(50);
function clearCache() {
    cacheMap.clear();
}
exports.clearCache = clearCache;
function cache(method, args, value) {
    var key = lodash_1.toString([method].concat(args));
    if (cacheMap.has(key)) {
        return Promise.resolve(cacheMap.get(key));
    }
    else {
        return new Promise(function (resolve, reject) {
            value.then(function (val) {
                cacheMap.set(key, val);
                resolve(cacheMap.get(key));
            }, reject);
        });
    }
}
