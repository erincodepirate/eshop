const { expressjwt: jwt } = require("express-jwt");

function expressJwt() {
    const secret = process.env.secret;
    const api = process.env.API_URL;
    return jwt({
        secret: secret, 
        algorithms: ["HS256"]
    }).unless({
        path: [
            {url: /\/api\/v1\/products(.*)/, methods: ['GET', 'OPTIONS']},
            {url: /\/api\/v1\/categories(.*)/, methods: ['GET', 'OPTIONS']},
            `${api}/users/login`,
            `${api}/v1/users/register`
        ]
    })
}

module.exports = expressJwt;