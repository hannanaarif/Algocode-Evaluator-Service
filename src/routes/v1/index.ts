import express from 'express';

import { pingcheck } from '../../controllers/pingController';

const v1router=express.Router();

v1router.get('/ping',pingcheck);

export default v1router;