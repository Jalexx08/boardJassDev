//* Libraries
const jwt = require("jsonwebtoken");

//* Autentication middlewares
const auth = (req, res, next) => {
    let jwtToken = req.header("Authorization");

    if(!jwtToken) return res.status(401).send("Autorización denegada: No hay token1");

    jwtToken = jwtToken.split(" ")[1];

    if(!jwtToken) return res.status(401).send("Autorización denegada: No hay token2");

    try {
        const payload = jwt.verify( jwtToken, "jassDevMySecret");
        req.user = payload;
        next();
    } catch (error) {

        return res.status(401).send("Autorización denegada: Token no válido")
        
    }

};

module.exports = auth;