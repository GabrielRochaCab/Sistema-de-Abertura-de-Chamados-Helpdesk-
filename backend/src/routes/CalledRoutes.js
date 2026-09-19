import express from 'express';
import { authenticate } from '../middlewares/AuthMiddleware.js';
import { createCalled, listCall, claimCall, changeStatus } from '../controllers/CalledController.js';

const router = express.Router();

router.post('/', authenticate, createCalled);
router.get('/', authenticate, listCall);
router.patch('/:id/assumir', authenticate, claimCall);
router.patch('/:id/status', authenticate, changeStatus);

export default router;