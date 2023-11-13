import  mongoose from "mongoose";
import { GroupInput } from "./group.model";

export interface UserBasic {
    name: string;
    email: string;
    password: string;
    role: string;
    groups: [GroupInput];
}

export interface UserInput extends UserBasic {
    password: string;
}

export  interface UserDocument extends UserInput, mongoose.Document {
    createdAt: Date;
    updatedAt: Date;
    deleteAt?: Date;
}

const userSchema = new mongoose.Schema({
        name: {type: String, required: true},
        email: {type: String, required: true, index: true, unique: true},
        password: {type: String, required: true},
        role: {type: String, required: true},
        groups: {type: Array, required: true}
    }, {timestamps: true, collection: "users"});

const User = mongoose.model<UserDocument>("User", userSchema);

export default User;
