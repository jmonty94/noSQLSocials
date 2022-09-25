const router = require('express').Router();
const thoughtController = require('./../../../controllers/thoughtController');

router.route('/').get(thoughtController.allThoughts)
.post(thoughtController.newThought);

router.route('/:thoughtId').get(thoughtController.getThoughtById)
.put(thoughtController.updateThought)
.delete(thoughtController.deleteThought);

router.route('/:thoughtId/reactions').post(thoughtController.newReaction);
router.route('/:thoughtId/reactions/:reactionId').delete(thoughtController.removeReaction);







module.exports = router