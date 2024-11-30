import express from 'express';
import { Song } from '../models';

const router = express.Router();

// Create a new song
router.post('/', async (req, res) => {
    try {
        const song = await Song.create(req.body);
        res.json(song);
    } catch (error) {
        res.status(500).json({ error: 'Unable to create song', details: error });
    }
});

// Get all songs
router.get('/', async (req, res) => {
    try {
        const songs = await Song.findAll();
        res.json(songs);
    } catch (error) {
        res.status(500).json({ error: 'Unable to fetch songs', details: error });
    }
});

// Get a song by id
router.get('/:id', async (req, res) => {
    try {
        const song = await Song.findByPk(req.params.id);
        if (song) {
            res.json(song);
        } else {
            res.status(404).json({ error: 'Song not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Unable to fetch song', details: error });
    }
});

// Update a song by id
router.put('/:id', async (req, res) => {
    try {
        const song = await Song.findByPk(req.params.id);
        if (song) {
            await song.update(req.body);
            res.json(song);
        } else {
            res.status(404).json({ error: 'Song not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Unable to update song', details: error });
    }
});

// Delete a song by id
router.delete('/:id', async (req, res) => {
    try {
        const song = await Song.findByPk(req.params.id);
        if (song) {
            await song.destroy();
            res.json({ message: 'Song deleted successfully' });
        } else {
            res.status(404).json({ error: 'Song not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Unable to delete song', details: error });
    }
});



export default router;
