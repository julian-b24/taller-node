import  mongoose, { Schema } from "mongoose";
import { UserBasic } from "./user.model";

export interface GroupInput {
    name: string;
    users: [UserBasic];
}

export  interface GroupDocument extends GroupInput, mongoose.Document {
    createdAt: Date;
    updatedAt: Date;
    deleteAt?: Date;
}

const groupSchema = new mongoose.Schema({
        name: {type: String, required: true, index: true},
        users: {type: Array, required: true}
    }, {timestamps: true, collection: "groups", versionKey: false});

const Group = mongoose.model<GroupDocument>("Group", groupSchema);

export default Group;
