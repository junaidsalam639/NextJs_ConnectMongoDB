const express = require("express");
const router = express.Router();
const { getAllUser, getAllUserOne, createUser, updateUser, deleteUser, loginUser } = require("../Controller/UserController");

router.get('/', getAllUser);
router.get('/:id', getAllUserOne);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.post('/login', loginUser);


module.exports = router;
