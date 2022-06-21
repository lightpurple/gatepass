import { Router } from 'express'
import * as LogController from './log.controller.js'

export const router = Router();
export const path = '/logs';

router.get('/', LogController.getLogs);
router.delete('/', LogController.deleteLogs);
