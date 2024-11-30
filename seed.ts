import {User, Playlist, Song, sequelize} from './models';

async function createTestData() {
    try {
        await sequelize.authenticate();
        console.log('Database connected...');

        // Create Users
        const users = await Promise.all([
            User.create({name: 'Alice'}),
            User.create({name: 'Bob'}),
            User.create({name: 'Charlie'}),
        ]);

        // Create Playlists
        const playlists = await Promise.all([
            Playlist.create({id: 0, name: 'Alice\'s Playlist', createdDate: new Date()}),
            Playlist.create({name: 'Bob\'s Playlist', createdDate: new Date()}),
            Playlist.create({name: 'Charlie\'s Playlist', createdDate: new Date()}),
        ]);

        // Create Songs
        const songs = await Promise.all([
            Song.create({title: 'Song 1', interpret: 'Artist A'}),
            Song.create({title: 'Song 2', interpret: 'Artist B'}),
            Song.create({title: 'Song 3', interpret: 'Artist C'}),
        ]);

        // Add Songs to Playlists
        await Promise.all([
            playlists[0].addSong(songs[0]),
            playlists[0].addSong(songs[1]),
            playlists[1].addSong(songs[1]),
            playlists[1].addSong(songs[2]),
            playlists[2].addSong(songs[2]),
            playlists[2].addSong(songs[0]),
        ]);

        // Create Follows (Followers)
        await Promise.all([
            users[0].addFollower(users[1]),
            users[1].addFollower(users[2]),
            users[2].addFollower(users[0]),
        ]);
    } catch (error) {
        console.error('Error seeding database:', error);
    } finally {
        await sequelize.close();
        console.log('Database connection closed...');
    }
}

createTestData().catch(error => {
    console.error('Error creating test data:', error);
    process.exit(1);
});
