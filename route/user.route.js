import express from 'express';
import {
 createUser,
 deleteUser,
 getAllUsers,
 loginUser,
 updateUser,
} from '../controller/user.controller.js';
const route = express.Router();

route.post('/createuser', createUser);
route.get('/getallusers', getAllUsers);
route.put('/updateuser/:id', updateUser);
route.post('/loginuser', loginUser);
route.delete('/deleteuser/:id', deleteUser);

export default route;
