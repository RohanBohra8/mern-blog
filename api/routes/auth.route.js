//to sepereate authentification routes from other routes
import express from 'express';
import { signup } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/signup', signup);

export default router;