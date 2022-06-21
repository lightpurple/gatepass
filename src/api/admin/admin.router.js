import { Router } from 'express'
import * as AdminController from './admin.controller.js'

export const router = Router();
export const path = '/admin';

router.post('/', AdminController.createAdmin);
