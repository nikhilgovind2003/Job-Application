import express from 'express';
import {
  createJob,
  getAllJobs,
  getMyJobs,
  updateJob,
  deleteJob
} from '../controllers/job.Controller.js';
import { protect } from '../middleware/auth.Moddileware.js';

const router = express.Router();

// Public
router.get('/all-jobs', getAllJobs);

// Protected
router.use(protect);
router.post('/', createJob);
router.get('/my-jobs', getMyJobs);
router.put('/:id', updateJob);
router.delete('/:id', deleteJob);

export default router;
