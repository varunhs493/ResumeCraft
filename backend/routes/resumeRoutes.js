import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { createResume, getResumeById, getUserResume,updateResume,deleteResume }from '../controllers/resumeController.js';
import { uploadResumeImages } from '../controllers/uploadImages.js';
import upload from '../middleware/uploadMiddleware.js';



const resumeRouter=express.Router();


resumeRouter.post('/',protect,createResume)
resumeRouter.get('/', protect, getUserResume)
resumeRouter.get('/:id',protect,getResumeById)

resumeRouter.put('/:id', protect, updateResume); // Assuming you want to update the resume with the same function
resumeRouter.put('/:id/upload-images',protect,
  upload.fields([{ name: 'thumbnail' }, { name: 'profileImage' }]),
  uploadResumeImages); // Assuming you have a function to handle image uploads

resumeRouter.delete('/:id', protect, deleteResume); // Assuming you have a function to delete resumes

export default resumeRouter;