import UserModel, {GroupInput, GroupDocument} from "../models/group.model";

class GroupService {
    public async create(GroupInput: GroupInput): Promise<GroupDocument | null> {
      try {
        return null;
        } catch (error) {
            throw error;
        }
    }

    public async findById(id: string): Promise<GroupDocument | null> {
        try {
            return null;
        } catch (error) {
            throw error 
        }        
    }

    public async findAll(): Promise<GroupDocument[]> {
        try {
            return [];
        }  catch (error) {
            throw error;
        }
    }

    public async update(user: GroupDocument, data: GroupInput): Promise<GroupDocument | null> {
        try {
            return null;
        }  catch (error) {
            throw error;
        }        

    }

    public async generateToken(user: GroupDocument): Promise<String> {
        try {
            return "";
        } catch (error) {
            throw error;            
        }
    }

}

export default new GroupService();