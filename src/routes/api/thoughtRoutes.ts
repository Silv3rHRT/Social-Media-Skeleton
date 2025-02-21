import { Router } from "express";

const router = Router();

router.route('/')
    .get()
    .post()

router.route('/:thoughtId')
    .get()
    .put()
    .delete()

router
    .route('/:thoughtId/reactions')
    .post()
    .delete()
export default router;