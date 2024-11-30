import request from 'supertest';
import app from '../app'; // Assuming your app.ts exports the express app
import { Playlist } from '../models';

describe('Playlist API', () => {
    let playlistId: number;

    it('should create a new playlist', async () => {
        const res = await request(app)
            .post('/api/playlists')
            .send({
                name: 'Test Playlist',
                createdDate: new Date(),
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('id');
        playlistId = res.body.id;
    });

    it('should get all playlists', async () => {
        const res = await request(app).get('/api/playlists');
        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toBeGreaterThan(0);
    });

    it('should get a playlist by id', async () => {
        const res = await request(app).get(`/api/playlists/${playlistId}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('id', playlistId);
    });

    it('should update a playlist by id', async () => {
        const res = await request(app)
            .put(`/api/playlists/${playlistId}`)
            .send({
                name: 'Updated Playlist',
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('name', 'Updated Playlist');
    });

    it('should delete a playlist by id', async () => {
        const res = await request(app).delete(`/api/playlists/${playlistId}`);
        expect(res.statusCode).toEqual(200);
        expect(res.body).toHaveProperty('message', 'Playlist deleted successfully');
    });

    it('should return 404 for non-existent playlist', async () => {
        const res = await request(app).get(`/api/playlists/999`);
        expect(res.statusCode).toEqual(404);
    });
});
