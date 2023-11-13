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

    public async findByName(groupName: string): Promise<GroupDocument | null> {
        try {
            const group = await GroupModel.findOne({"name" : groupName});
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
            console.log("In service: " );
            console.log(group);
            console.log(user);
             
            if(group && user) {
                if(await this.userIsInGroup(group, user)){
                    throw new Error("User is already in group");
                }
                if(await this.userHasGroupAssociated(group, user)) {
                    throw new Error("User already has group associated");
                }

                group.users.push(newUser);
                await group.save();

                user.groups.push(group);
                user.save();

                return group;
            } else {
                throw new Error("User or group not found in DB");
            }
        }  catch (error) {
            throw error;
        }        
    }

    public async deleteUserFromGroup(groupId: string, userId: string): Promise<GroupDocument | null> {
        try {
            const group: GroupDocument | null = await GroupModel.findById(groupId);
            const user: UserDocument | null = await UserModel.findById(userId);
            if(group && user) {
                if(await !this.userIsInGroup(group, user)){
                    throw new Error("User is not part of the group");
                }
                if(await !this.userHasGroupAssociated(group, user)) {
                    throw new Error("User already doesn't have group associated");
                }               
                
                const users = group.users.filter(u => u.email !== user.email) as [UserBasic];
                group.users = users;
                await group.save();            

                const groups = user.groups.filter(g => g.name !== group.name) as [GroupInput];
                user.groups = groups;
                user.save();

                return group;
            } else {
                throw new Error("User is not part of the group");
            }
        }  catch (error) {
            throw error;
        }        
    }

    private async userIsInGroup(group: GroupDocument, user: UserDocument): Promise<boolean> {        
        const inGroup: boolean = group.users.filter(u => u.email === user.email).length === 1;
        return inGroup;
    }

    private async userHasGroupAssociated(group: GroupDocument, user: UserDocument): Promise<boolean> {
        const hasGroupAssociated: boolean = user.groups.filter(g => g.name === group.name).length === 1;
        return hasGroupAssociated;
    }
}

export default new GroupService();