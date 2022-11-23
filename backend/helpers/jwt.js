const { expressjwt: jwt } = require("express-jwt");

function expressJwt() {
    const secret = process.env.secret;
    const api = process.env.API_URL;
    return jwt({
        secret: secret, 
        algorithms: ["HS256"],
        isRevoked: isRevoked
    }).unless({
        path: [
            //temporarily comment out
            /*{url: /\/api\/v1\/products(.*)/, methods: ['GET', 'OPTIONS']},
            {url: /\/api\/v1\/categories(.*)/, methods: ['GET', 'OPTIONS']},
            {url: /\/public\/uploads(.*)/, methods: ['GET', 'OPTIONS']},
            `${api}/users/login`,
            `${api}/v1/users/register`*/
            {url: /.*/}
        ]
    })
}

async function isRevoked(req, payload) {
    if (!payload.isAdmin) {
        return false;
    }
    return true;
}

module.exports = expressJwt;