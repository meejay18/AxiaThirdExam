import express from 'express';
import {
 createUser,
 deleteUser,
 getAllUsers,
 getOneUser,
 loginUser,
 updateUser,
} from '../controller/user.controller.js';
const route = express.Router();
import { authentication } from '../middleware/auth.middleware.js';

route.post('/createuser', createUser);
route.get('/getallusers', getAllUsers);
route.get('/getOneuser/:id', authentication, getOneUser);
route.put('/updateuser/:id', updateUser);
route.post('/loginuser', loginUser);
route.delete('/deleteuser/:id', deleteUser);

export default route;
