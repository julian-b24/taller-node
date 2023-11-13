import {Request, Response} from 'express';
import groupService from '../services/group.service';
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
                return res.status(400).json({message: "Group already exists"});
            }
            const group: GroupDocument | null = await groupService.delete(req.params.id);
            
            return res.status(200).json(group);
        } catch (error) {
            res.status(500).json(error);
        }
    }

    public async addUserToGroup(req: Request, res: Response) {
        try{
            
            return res.status(200).json();
        } catch (error) {
            res.status(500).json(error);
        }
    }

    public async deleteUserFromGroup(req: Request, res: Response) {
        try{
            
            return res.status(200).json();
        } catch (error) {
            res.status(500).json(error);
        }
    }

    public async findUsersInGroup(req: Request, res: Response) {
        try{
            
            return res.status(200).json();
        } catch (error) {
            res.status(500).json(error);
        }
    }
    
    
}

export default new GroupController();