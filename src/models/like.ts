import mongoose from 'mongoose';
const LikeSchema = new mongoose.Schema({
    post : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "post",
        
    },
    comment : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'comment',
    },
    nastedComment : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'nastedComment',
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user',
        require : true,
    }
},{timestamps : true})

export const LikeModel = mongoose.model('like',LikeSchema);

