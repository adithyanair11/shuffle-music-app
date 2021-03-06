const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const SpotifyWebApi = require('spotify-web-api-node');
require('dotenv').config();
const app = express();

app.use(cors());
app.use(bodyParser.json());


app.post('/refresh', (req,res) => {
    const refreshToken = req.body.refreshToken
    const spotifyApi = new SpotifyWebApi({
        redirectUri: 'http://localhost:3000/',
        clientId: '3af44969d17340bb8bcd37790457c1f4',
        clientSecret: 'e73ff921f6c7425893419fb85269d033',
        refreshToken
    })

    spotifyApi.refreshAccessToken()
    .then(data => {
        res.json({
            accessToken: data.body.access_token,
            expiresIn: data.body.expires_in
        })
    })
    .catch((err) => {
        console.log(err)
        res.sendStatus(400);
    })
})

app.post('/login', (req,res) => {
    const code = req.body.code || null
    const spotifyApi = new SpotifyWebApi({
        redirectUri: 'http://localhost:3000/',
        clientId: '3af44969d17340bb8bcd37790457c1f4',
        clientSecret: 'e73ff921f6c7425893419fb85269d033',
        
    })

    spotifyApi.authorizationCodeGrant(code)
    .then((data) => {
        res.json({
            accessToken: data.body.access_token,
            refreshToken: data.body.refresh_token,
            expiresIn: data.body.expires_in
        })
    })
    .catch((err) => {
        console.log(err)
        res.sendStatus(400)
    });
})

app.listen(process.env.PORT || 3001);