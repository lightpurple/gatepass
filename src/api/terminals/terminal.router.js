import { Router } from 'express'
import * as TerminalController from './terminal.controller.js'

export const router = Router();
export const path = '/terminals';

router.get('/', TerminalController.getTerminals);
router.post('/', TerminalController.createTerminal);
router.put('/:terminalId', TerminalController.modifyTerminal);
router.delete('/:terminalId', TerminalController.deleteTerminal);
