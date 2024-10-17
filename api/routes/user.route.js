import express from 'express';
import { test } from '../controllers/user.controller.js';

const router = express.Router();

//creating a test api
router.get('/test', test);

export default router;