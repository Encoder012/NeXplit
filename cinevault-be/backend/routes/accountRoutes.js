import express from 'express';
import { createAccount, listAccounts } from '../controllers/accountController.js';

const router = express.Router();

router.get('/', listAccounts);
router.post('/add', createAccount);

export default router;
