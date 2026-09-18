import express from 'express';
import { authenticate } from '../middlewares/AuthMiddleware.js';
import { createCalled } from '../controllers/CalledController.js'; 

const router = express.Router();

router.post('/createCalled', authenticate, createCalled);

export default router;