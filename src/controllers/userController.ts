import { Request, Response } from "express";
import { User } from "../models/index.js";


export const getAllUsers = async(_req: Request, res: Response) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error : any){
        res.status(500).json({
            message: error.message
        });
    }
}

export const getUserById = async(req: Request, res: Response) => {
    const { userId } = req.params;
    try {
        const user = await User.findById(userId);
        if(user) {
            res.json(user)
        } else {
            res.status(404).json({
                message: 'User not found in that empty little head of yours.'
            })
        }
    } catch (err: any){
        res.status(501).json({
            message: err.message
        })
    }
}

export const createUser = async(req: Request, res: Response) => {
    const { user } = req.body;
    try{
        const newUser = await User.create({
            user
        })
        res.json(newUser);
    } catch (e:any){
        res.status(409).json({
            message: e.message
        })
    }    
}

export const updateUser = async (req: Request, res: Response) => {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!user) {
        res.status(404).json({ message: 'I told you there are no users found in your head with this id how do you expect to update it!' });
      }

      res.json(user)
    } catch (error: any) {
      res.status(406).json({
        message: error.message
      });
    }
  };

  export const deleteUser= async (req: Request, res: Response) => {
    try {
      const user = await User.findOneAndDelete({ _id: req.params.courseId});
      
      if(!user) {
        res.status(404).json({
          message: 'Cannot delete a user that doesnt exist, stupid.'
        });
        return;
      }
      res.json({
        message: 'Deleted the user and all reated reactions, congratulations dummy!'
      })
    } catch (error: any) {
      res.status(500).json({
        message: error.message
      });
    }
  };

  export const addFriend = async (req: Request, res: Response) => {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendId } },
        { runValidators: true, new: true }
      );
  
      if (!user) {
        res.status(404).json({ message: 'See, I told you that you dont have any friends!' });
      }
  
      res.json(user)
    } catch (error: any) {
      res.status(407).json({
        message: error.message
      });
    }
  };

    export const deleteFriend = async (req: Request, res: Response) => {
        try {
        const user = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId } },
            { runValidators: true, new: true }
        );
        if (!user) {
            res.status(404).json({ message: 'No user found with this id to even delete a friend from, you pathetic worm' });
            return;
        }
    }
    catch (error: any) {
        res.status(500).json({
            message: error.message
        });
    }
};