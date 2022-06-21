import { Router } from 'express'
import * as UserController from './user.controller.js'

export const router = Router();
export const path = '/users';

router.get('/', UserController.getUsers);
router.post('/', UserController.createUser);
router.put('/:userId', UserController.modifyUser);
router.delete('/:userId', UserController.deleteUser);

router.get('/:userId/terminals', UserController.getUserGrants);
router.post('/:userId/terminals', UserController.addUserGrants);
