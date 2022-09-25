const router = require('express').Router();
const userController = require('./../../../controllers/userController');



router.route('/').get(userController.allUsers)
.post(userController.newUser)

router.route('/:userId').get(userController.userById)
.put(userController.updateUser)
.delete(userController.deleteUser);

router.route('/:userId/friends/:friendId').post(userController.addFriend)
.delete(userController.removeFriend);



module.exports = router;