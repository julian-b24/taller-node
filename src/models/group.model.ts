import  mongoose from "mongoose";

export interface GroupInput {
    name: string;
    users: string[];
    active: boolean;
}

export  interface GroupDocument extends GroupInput, mongoose.Document {
    createdAt: Date;
    updatedAt: Date;
    deleteAt?: Date;
}

const groupSchema = new mongoose.Schema({
        name: {type: String, required: true},
        email: {type: String, required: true, index: true, unique: true},
        password: {type: String, required: true}
    }, {timestamps: true, collection: "groups"});

const Group = mongoose.model<GroupDocument>("Group", groupSchema);

export default Group;
