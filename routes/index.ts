import express from 'express';
import userRoutes from './users';
import playlistRoutes from './playlists';
import songRoutes from './songs';

const router = express.Router();

router.use('/users', userRoutes);
router.use('/playlists', playlistRoutes);
router.use('/songs', songRoutes);

export default router;
