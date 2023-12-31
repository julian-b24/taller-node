import UserModel, {UserInput, UserDocument} from "../models/user.model";
import jwt  from "jsonwebtoken";
import GroupModel, {GroupDocument} from "../models/group.model";

class UserService {
    public async create(userInput: UserInput): Promise<UserDocument> {
      try {
        const user = await UserModel.create(userInput);
        return user;
        } catch (error) {
            throw error;
        }
    }

    public async findByEmail(email: string): Promise<UserDocument | null> {
        try {
            const userExists = await UserModel.findOne({email});
            return userExists;
        } catch (error) {
            throw error 
        }
    }

    public async findById(id: string): Promise<UserDocument | null> {
        try {
            const user = await UserModel.findById(id);
            return user;
        } catch (error) {
            throw error 
        }        
    }

    public async findAll(): Promise<UserDocument[]> {
        try {
            const users = await UserModel.find();
            return users;
        }  catch (error) {
            throw error;
        }
    }

    public async update(user: UserDocument, data: UserInput): Promise<UserDocument | null> {
        try {
            const userUpdate: UserDocument | null = await UserModel.findOneAndUpdate({_id: user.id}, data,{new: true});
            return userUpdate;

        }  catch (error) {
            throw error;
        }        

    }

    public async delete(userId: string): Promise<UserDocument | null> {
        try {
            const deletedUser: UserDocument | null = await UserModel.findByIdAndDelete(userId);
            return deletedUser;

        }  catch (error) {
            throw error;
        }        

    }

    public async generateToken(user: UserDocument): Promise<String> {
        try {
            const token = jwt.sign({user_id: user.id, email: user.email, role: user.role}, process.env.JWT_SECRET || 'secret', {expiresIn: "5m"});

            return token;
        } catch (error) {
            throw error;            
        }
    }

    public async findUserGroups(userId: string): Promise<GroupDocument[]> {
        try {
            const user = await UserModel.findById(userId);
            if (!user) {
                return [];
            }

            const groupPromises: Promise<GroupDocument | null>[] = user.groups.map(async g => {
                const group: GroupDocument | null = await GroupModel.findOne({ "name": g.name });
                return group;
            });

            const resolvedGroups: (GroupDocument | null)[] = await Promise.all(groupPromises);
            const groups: GroupDocument[] = resolvedGroups.filter(group => group !== null) as GroupDocument[];

            return groups;

        }  catch (error) {
            throw error;
        }        

    }

}

export default new UserService();