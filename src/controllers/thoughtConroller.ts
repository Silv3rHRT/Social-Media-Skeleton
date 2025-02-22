import { Request, Response } from "express";
import { Thought } from "../models/index.js";


export const getAllThoughts = async(_req: Request, res: Response) => {
    try {
        const thoughts = await Thought.find();
        res.json(thoughts);
    } catch (error : any){
        res.status(500).json({
            message: error.message
        });
    }
}

export const getThoughtById = async(req: Request, res: Response) => {
    const { thoughtId } = req.params;
    try {
        const thought = await Thought.findById(thoughtId);
        if(thought) {
            res.json(thought)
        } else {
            res.status(404).json({
                message: 'Thought not found in that empty little head of yours.'
            })
        }
    } catch (err: any){
        res.status(501).json({
            message: err.message
        })
    }
}

export const createThought = async(req: Request, res: Response) => {
    const { thought } = req.body;
    try{
        const newThought = await Thought.create({
            thought
        })
        res.status(201).json(newThought);
    } catch (e:any){
        res.status(400).json({
            message: e.message
        })
    }    
}

export const updateThought = async (req: Request, res: Response) => {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!thought) {
        res.status(404).json({ message: 'I told you there are no thoughts found in your head with this id!' });
      }

      res.json(thought)
    } catch (error: any) {
      res.status(400).json({
        message: error.message
      });
    }
  };

  export const deleteThought= async (req: Request, res: Response) => {
    try {
      const thought = await Thought.findOneAndDelete({ _id: req.params.courseId});
      
      if(!thought) {
        res.status(404).json({
          message: 'Cannot delete a thought that doesnt exist, stupid.'
        });
        return;
      }
      res.json({
        message: 'Deleted the thought and all reated reactions, congratulations dummy!'
      })
    } catch (error: any) {
      res.status(500).json({
        message: error.message
      });
    }
  };

  export const addReaction = async (req: Request, res: Response) => {
    try {
        const thought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { runValidators: true, new: true }
        );
        if (!thought) {
            res.status(404).json({ message: 'No thought found with this id to even react to, how do you function on the daily' });
            return;
        }
    } catch (error: any) {
        res.status(500).json({
            message: error.message
            });
        }
    }

    export const deleteReaction = async (req: Request, res: Response) => {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { reactions: { reactionId: req.params.reactionId } } },
                { runValidators: true, new: true }
            );
            if (!thought) {
                res.status(404).json({ message: 'No thought by that id to delete reactions to' });
                return;
            }
        } catch (error: any) {
            res.status(500).json({
                message: error.message
            });
        }
    }