import { Router } from "express";

const router = Router();

router.route('/').get().post().put().delete();

router
 .route('/:userId/friends/:friendId')
 .post()
 .delete()

export default router;