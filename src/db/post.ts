import mongoose from 'mongoose';
const PostSchema = new mongoose.Schema({
    name : {
        type : String,
        require : true,
    },
    contenue : {
        type : String,
        require : true,
    },
    image :{
        type : String,
        require : true,
    }
},{timestamps : true})

export const PostModel = mongoose.model('post' , PostSchema);