import {Request, Response} from 'express';
import userService from '../services/user.service';
import {GroupDocument} from '../models/group.model';

class GroupController {
    public async create(req: Request, res: Response): Promise<Response> {
        try {
            
            return res.status(201).json();

        } catch (error) {
            return res.status(500).json(error);
        }
    }

    public async findAll(req: Request, res: Response): Promise<Response> {
        try {
            return res.status(200).json();
        }catch (error) {
            return res.status(500).json(error);
        }
    }

    public async findById(req: Request, res: Response) {
        try{
            
            return res.status(200).json();
        } catch (error) {
            res.status(500).json(error);
        }
    }

    public async update(req: Request, res: Response) {
        try{
            
            return res.status(200).json();
        } catch (error) {
            res.status(500).json(error);
        }
    }

    public async delete(req: Request, res: Response) {
        try{
            
            return res.status(200).json();
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