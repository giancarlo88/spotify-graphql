"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var decorators_1 = require("../../lib/decorators");
describe('SpotifyQuery Decorator', function () {
    function buildFakeSpotifyClient(resolver) {
        return {
            query: resolver
        };
    }
    describe('when data fetching is a success', function () {
        it('should call method', function (done) {
            var data = [{ track: 'Track' }];
            var fakeSpotifyClient = buildFakeSpotifyClient(function () { return Promise.resolve({ data: data, errors: null }); });
            var successSpy = jasmine.createSpy('success');
            var SpotifyQuery = decorators_1.SpotifyDecorators(fakeSpotifyClient).SpotifyQuery;
            var A = (function () {
                function A() {
                }
                A.prototype.method = function (data) {
                    successSpy(data);
                };
                __decorate([
                    SpotifyQuery("\n          track(id: 'id') {\n            name\n          }\n        "),
                    __metadata("design:type", Function),
                    __metadata("design:paramtypes", [Object]),
                    __metadata("design:returntype", Object)
                ], A.prototype, "method", null);
                return A;
            }());
            (new A).method().then(function () {
                expect(successSpy).toHaveBeenCalledWith(data);
                done();
            }, done);
        });
    });
    describe('when data fetching is a failure', function () {
        it('should not call method', function (done) {
            var data = [{ track: 'Track' }];
            var fakeSpotifyClient = buildFakeSpotifyClient(function () { return Promise.reject('error'); });
            var successSpy = jasmine.createSpy('success');
            var failureSpy = jasmine.createSpy('failure');
            var SpotifyQuery = decorators_1.SpotifyDecorators(fakeSpotifyClient).SpotifyQuery;
            var A = (function () {
                function A() {
                }
                A.prototype.method = function (data) {
                    successSpy(data);
                };
                __decorate([
                    SpotifyQuery("\n          track(id: 'id') {\n            name\n          }\n        "),
                    __metadata("design:type", Function),
                    __metadata("design:paramtypes", [Object]),
                    __metadata("design:returntype", Object)
                ], A.prototype, "method", null);
                return A;
            }());
            (new A).method().then(function () { }, failureSpy).then(function () {
                expect(successSpy).not.toHaveBeenCalled();
                expect(failureSpy).toHaveBeenCalledWith('error');
                done();
            });
        });
    });
});
