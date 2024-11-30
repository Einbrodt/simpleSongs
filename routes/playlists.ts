import express from 'express';
import { Playlist } from '../models';

const router = express.Router();

// Create a new playlist
router.post('/', async (req, res) => {
    const playlist = await Playlist.create(req.body);
    res.json(playlist);
});

// Get all playlists
router.get('/', async (req, res) => {
    const playlists = await Playlist.findAll();
    res.json(playlists);
});

// Get a playlist by id
router.get('/:id', async (req, res) => {
    const playlist = await Playlist.findByPk(req.params.id);
    if (playlist) {
        res.json(playlist);
    } else {
        res.status(404).json({ error: 'Playlist not found' });
    }
});

// Update a playlist by id
router.put('/:id', async (req, res) => {
    const playlist = await Playlist.findByPk(req.params.id);
    if (playlist) {
        await playlist.update(req.body);
        res.json(playlist);
    } else {
        res.status(404).json({ error: 'Playlist not found' });
    }
});

// Delete a playlist by id
router.delete('/:id', async (req, res) => {
    const playlist = await Playlist.findByPk(req.params.id);
    if (playlist) {
        await playlist.destroy();
        res.json({ message: 'Playlist deleted successfully' });
    } else {
        res.status(404).json({ error: 'Playlist not found' });
    }
});


export default router;
