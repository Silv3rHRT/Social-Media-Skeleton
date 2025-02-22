import { Router } from "express";
import { addReaction, createThought, deleteReaction, deleteThought, getAllThoughts, getThoughtById, updateThought } from "../../controllers/thoughtConroller.js";

const router = Router();

router.route('/')
    .get(getAllThoughts)
    .post(createThought)

router.route('/:thoughtId')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought)

router
    .route('/:thoughtId/reactions')
    .post(addReaction)
router
    .route('/:thoughtId/reactions/:reactionId')
    .delete(deleteReaction)
export default router;