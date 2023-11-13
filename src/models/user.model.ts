import  mongoose from "mongoose";
import { GroupInput } from "./group.model";

export interface UserBasic {
    name: string;
    email: string; 
}

export interface UserInput extends UserBasic {
    password: string;
    groups: [GroupInput];
    role: "superadmin" | "user" | undefined;
}

export interface UserDocument extends UserInput, mongoose.Document {
    createdAt: Date;
    updatedAt: Date;
    deleteAt?: Date;
}

const userSchema = new mongoose.Schema({
        name: {type: String, required: true},
        email: {type: String, required: true, index: true, unique: true},
        password: {type: String, required: true},
        role: {type: String, required: true, enum: ["superadmin", "user"]},
        groups: {type: Array, required: true}
    }, {timestamps: true, collection: "users", versionKey: false});

const User = mongoose.model<UserDocument>("User", userSchema);

export default User;
