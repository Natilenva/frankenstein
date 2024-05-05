import express from 'express';
import authUser from '../middlewares/auth.js';
import { newEventController } from '../controllers/events/newEventController.js';
import { getAllEventsController } from '../controllers/events/getAllEventsController.js';
import { getEventController } from '../controllers/events/getEventController.js';
import { updateEventController } from '../controllers/events/updateEventController.js';
import { deleteEventController } from '../controllers/events/deleteEventController.js';
import { getRegisterEventsController } from '../controllers/events/getRegisterEventsController.js';
const router = express.Router();

router.post('/newevent', authUser, newEventController);
router.get('/events', getAllEventsController);
// router.get('/my', userAuth, getAllMyProjects);
router.get('/event/:id', getEventController);
router.put('/eventupdate/:event_id', authUser, updateEventController);
router.delete('/event/:id', authUser, deleteEventController);
router.get('/register/:id/events', getRegisterEventsController);
export default router;
