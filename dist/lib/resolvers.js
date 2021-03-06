"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var album_1 = require("./resolvers/album");
var artist_1 = require("./resolvers/artist");
var player_1 = require("./resolvers/player");
var playlist_1 = require("./resolvers/playlist");
var privateUser_1 = require("./resolvers/privateUser");
var publicUser_1 = require("./resolvers/publicUser");
var queries_1 = require("./resolvers/queries");
var track_1 = require("./resolvers/track");
exports.default = (function (spotifyApiClient) {
    return {
        Query: queries_1.queries(spotifyApiClient),
        Track: track_1.trackResolvers(spotifyApiClient),
        Artist: artist_1.artistResolvers(spotifyApiClient),
        Album: album_1.albumResolvers(spotifyApiClient),
        Playlist: playlist_1.playlistResolvers(spotifyApiClient),
        PrivateUser: privateUser_1.privateUserResolvers(spotifyApiClient),
        PublicUser: publicUser_1.publicUserResolvers(spotifyApiClient),
        Player: player_1.playerResolvers(spotifyApiClient),
    };
});
