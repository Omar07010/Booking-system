import { expressjwt } from 'express-jwt';


function authJwt() {
    const jwtSecret = process.env.JWT_SECRET;
    const API = process.env.API;
    return expressjwt({
        secret: jwtSecret,
        algorithms: ['HS256'],
        isRevoked: isRevoked
    })
    .unless({
        path: [
            // {url: /\/api\/v1\/products(.*)/, method: ['GET', 'OPTIONS']}, // regular expretions: /\api\/v1\/products(.*)/ lm3na dyalha anana ymkn lina nwslo l ay haja mor products mashi ghir products bohda 3la sabil lmital 'products/get/featured/:count'.
            {url: /\/booking\/hotel\/users(.*)/, method: ['GET', 'OPTIONS']}, 
            {url: /\/booking\/hotel\/venues(.*)/, method: ['GET', 'OPTIONS']}, 
            '/booking/hotel/users/login',
            '/booking/hotel/users/register',
        ]     
    })
}

async function isRevoked(req, jwt) {
    const payload = jwt.payload;
    if (payload.role === 'admin') {
        return true;
    }
    return false
}

export default authJwt;