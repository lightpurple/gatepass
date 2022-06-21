import { Router } from 'express'
import * as UserRouter from './users/user.router.js'
import * as TerminalRouter from './terminals/terminal.router.js'
import * as LogRouter from './logs/log.router.js'
import * as AdminRouter from './admin/admin.router.js'
import * as AuthRouter from './auth/auth.router.js'

export const router = Router();
export const path = '';

router.use(UserRouter.path, UserRouter.router);
router.use(TerminalRouter.path, TerminalRouter.router);
router.use(LogRouter.path, LogRouter.router);
router.use(AdminRouter.path, AdminRouter.router);
router.use(AuthRouter.path, AuthRouter.router);
