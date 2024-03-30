
import jwt from 'jsonwebtoken';

const authentication = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    // console.log(authHeader);
    if (!authHeader) {
        return res.status(404).json("Authorization header is missing");
    }
    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
        if (err) {
            return res.status(403).json("Unauthorized access");
        } else { 
            req.userId = data.userId;
            next();
        }
    });
};

export default authentication;
