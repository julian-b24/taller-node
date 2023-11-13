import GroupModel, {GroupInput, GroupDocument} from "../models/group.model";
import UserModel, {UserBasic, UserDocument} from "../models/user.model";

class GroupService {
    public async create(GroupInput: GroupInput): Promise<GroupDocument> {
      try {
        const group = await GroupModel.create(GroupInput);
        return group;
        } catch (error) {
            throw error;
        }
    }

    public async findById(id: string): Promise<GroupDocument | null> {
        try {
            const group = await GroupModel.findById(id);
            return group;
        } catch (error) {
            throw error 
        }        
    }

    public async findAll(): Promise<GroupDocument[]> {
        try {
            const groups = await GroupModel.find();
            return groups;
        }  catch (error) {
            throw error;
        }
    }

    public async update(group: GroupDocument, data: GroupInput): Promise<GroupDocument | null> {
        try {
            const groupUpdate: GroupDocument | null = await GroupModel.findOneAndUpdate({_id: group.id}, data,{new: true});
            return groupUpdate;
        }  catch (error) {
            throw error;
        }        
    }

    public async delete(id: string): Promise<GroupDocument | null> {
        try {
            const deletedGroup: GroupDocument | null = await GroupModel.findByIdAndDelete(id); 
            return deletedGroup;
        }  catch (error) {
            throw error;
        }        
    }

    public async addUserToGroup(groupId: string, newUser: UserBasic): Promise<GroupDocument | null> {
        try {
            const group: GroupDocument | null = await GroupModel.findById(groupId);
            const user: UserDocument | null = await UserModel.findOne({"email": newUser.email}); 
            if(group && user){
                
                group.users.push(newUser);
                await group.save();

                user.groups.push(group._id);
                user.save();

                return group;
            } else {
                throw new Error;
            }
        }  catch (error) {
            throw error;
        }        
    }

    public async deleteUserFromGroup(groupId: string, userId: string): Promise<GroupDocument | null> {
        try {
            const group: GroupDocument | null = await GroupModel.findById(groupId);
            const user: UserDocument | null = await UserModel.findById(userId); 
            if(group && user 
                && await this.userIsInGroup(group, user) 
                && await this.userHasGroupAssociated(group, user)){
                
                const users = group.users.filter(u => u.email !== user.email) as [UserBasic];
                group.users = users;
                await group.save();

                const groups = user.groups.filter(g => g.name !== group.name) as [GroupInput];
                user.groups = groups;
                user.save();

                return group;
            } else {
                throw new Error;
            }
        }  catch (error) {
            throw error;
        }        
    }

    private async userIsInGroup(group: GroupDocument, user: UserDocument): Promise<boolean> {
        const inGroup: boolean = group.users.filter(u => u.email === user.email) !== null;
        return inGroup;
    }

    private async userHasGroupAssociated(group: GroupDocument, user: UserDocument): Promise<boolean> {
        const hasGroupAssociated: boolean = user.groups.filter(g => g.name === group.name) !== null;
        return hasGroupAssociated;
    }
}

export default new GroupService();