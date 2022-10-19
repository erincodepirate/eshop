const { expressjwt: jwt } = require("express-jwt");

function expressJwt() {
    const secret = process.env.secret;
    return jwt({secret: secret, algorithms: ["HS256"]})
}

module.exports = expressJwt;