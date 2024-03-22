import express,{Request,Response,NextFunction} from 'express';
const authorizeAdmin = (req : Request,res :Response,next : NextFunction)=>{
    console.log('req.user => ',req.user)
    console.log('req.user.role => ',req.user.role)
    if(req.user && req.user.role === 'admin') {
        next();
    }else {
        res.status(403).json({ error: 'Forbidden' });
    }
}

export default authorizeAdmin;