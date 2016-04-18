import jwt from 'jsonwebtoken';
import config from '../config';

let authMiddleware = (req, res, next) => {
    let token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (token) {
        jwt.verify(token, config.secret, (err, decoded) => {
            if (err) {
                return res.status(401).json({
                    success: false,
                    message: 'Token is invalid or expired.'
                });
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        return res.status(401).send({
            success: false,
            message: 'No token provided.'
        });
    }
};

export default authMiddleware;
