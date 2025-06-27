import { createKyc, getOneKyc } from '../controller/kyc.controller.js';
import { authentication } from '../middleware/auth.middleware.js';

import express from 'express';
const route = express.Router();

route.post('/kyc/createKyc', authentication, createKyc);
route.get('/kyc/getKyc/:kycId', getOneKyc);

export default route;
