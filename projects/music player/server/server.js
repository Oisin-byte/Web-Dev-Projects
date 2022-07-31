const express = require("express");
const SpotifyWebApi = require("spotify-web-api-node");
// import spotifyWebApi from "spotify-web-api-node";

const app = express();

app.post('/login', (req, res) => {
    const code = req.body.code
    const spotifyApi = new SpotifyWebApi({
        redirectUrl: 'http://localhost:3000',
        clientId: '24ad2bf84c5240e78da64a2acdff51c9',
        clientSecret: '78b2c5e6006e4b0eb53877cb4878d4f9'
    })

    spotifyApi
    .authorizationCodeGrant(code)
    .then(data => {
        res.json({
            accessToken: data.body.access_token,
            refreshToken: data.body.refresh_token,
            expiresIn: data.body.expires_in
        }).catch(() => {
            res.sendStatus(400)
        })
    })
})

app.listen(3001)