const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserModel = new Schema ({
    
    UserProfile: {
        type:  mongoose.Schema.Types.ObjectId,
        ref: "chercheur"
    },
    username: {
        type: String,
        required: true,
      
    },
    passeword: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true,
        default:"chercheur"
    }
}, { timestamps: true });

const User = mongoose.model("user",UserModel);
module.exports = User;