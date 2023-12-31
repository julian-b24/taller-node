import {Request, Response} from 'express';
import userService from '../services/user.service';
import groupService from '../services/group.service';
import { UserDocument } from '../models/user.model';
import {GroupInput, GroupDocument} from '../models/group.model';

class GroupController {
    public async create(req: Request, res: Response): Promise<Response> {
        try {
            const groupExists: GroupDocument | null = await groupService.findByName(req.body.name);
            if(groupExists){
                return res.status(400).json({message: "Group already exists"});
            }
            const group: GroupDocument = await groupService.create(req.body as GroupInput);
            return res.status(201).json(group);

        } catch (error) {
            return res.status(500).json(error);
        }
    }

    public async findAll(req: Request, res: Response): Promise<Response> {
        try {
            const groups: GroupDocument[] = await groupService.findAll();
            return res.status(200).json(groups);
        }catch (error) {
            return res.status(500).json(error);
        }
    }

    public async findById(req: Request, res: Response) {
        try{
            const group: GroupDocument | null = await  groupService.findById(req.params.id);
            if(group === null){
                return res.status(404).json({message: "Group not found"});
            }
            return res.status(200).json(group);
        } catch (error) {
            res.status(500).json(error);
        }
    }

    public async update(req: Request, res: Response) {
        try{
            const group: GroupDocument | null = await  groupService.findById(req.params.id);
            
            if(group === null){
                return res.status(404).json({message: "Group not found"});
            }

            const updategroup: GroupDocument | null = await groupService.update(group, req.body)

            return res.status(200).json(updategroup)
        } catch (error) {
            res.status(500).json(error);
        }
    }

    public async delete(req: Request, res: Response) {
        try{
            const groupExists: GroupDocument | null = await groupService.findById(req.params.id);
            if(groupExists ===  null){
                return res.status(400).json({message: "Group not found"});
            }
            const group: GroupDocument | null = await groupService.delete(req.params.id);
            
            return res.status(200).json(group);
        } catch (error) {
            res.status(500).json(error);
        }
    }

    public async addUserToGroup(req: Request, res: Response) {
        try{
            const group: GroupDocument | null = await  groupService.findById(req.params.id);   
            if(group === null){
                return res.status(404).json({message: "Group not found"});
            }

            const user: UserDocument | null = await  userService.findByEmail(req.body.email);
            
            if(user === null){
                return res.status(404).json({message: "User not found"});
            }

            const groupModified = await groupService.addUserToGroup(req.params.id, req.body)
            
            return res.status(200).json(groupModified);
        } catch (e) {
            const error = e as Error;
            res.status(500).json(error.message);
        }
    }

    public async deleteUserFromGroup(req: Request, res: Response) {
        try{
            const group: GroupDocument | null = await  groupService.findById(req.params.id);   
            if(group === null){
                return res.status(404).json({message: "Group not found"});
            }

            const user: UserDocument | null = await  userService.findById(req.params.userId);
            if(user === null){
                return res.status(404).json({message: "User not found"});
            }

            const groupModified = await groupService.deleteUserFromGroup(req.params.id, req.params.userId)
            
            return res.status(200).json(groupModified);
        } catch (error) {
            res.status(500).json(error);
        }
    }

    public async findUsersInGroup(req: Request, res: Response) {
        try{
            const group: GroupDocument | null = await  groupService.findById(req.params.id);   
            if(group === null){
                return res.status(404).json({message: "Group not found"});
            }

            const users = await groupService.findUsersInGroup(req.params.id)

            return res.status(200).json(users);
        } catch (error) {
            res.status(500).json(error);
        }
    }
    
    
}

export default new GroupController();