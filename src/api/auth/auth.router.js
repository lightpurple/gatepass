import { Router } from 'express'
import * as AuthController from './auth.controller.js'

export const router = Router();
export const path = '/auth';

router.post('/terminal', AuthController.authTerminal);
