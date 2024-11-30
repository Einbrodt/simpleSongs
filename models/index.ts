import { Sequelize } from 'sequelize';
import { createUserModel } from './user';
import { createPlaylistModel } from './playlist';
import { createSongModel } from './song';

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite'
});

const User = createUserModel(sequelize);
const Playlist = createPlaylistModel(sequelize);
const Song = createSongModel(sequelize);

User.hasMany(Playlist, { as: 'Playlists', foreignKey: 'ownerId' });
Playlist.belongsTo(User, { as: 'Owner', foreignKey: 'ownerId' });

Playlist.belongsToMany(Song, { through: 'PlaylistSongs' });
Song.belongsToMany(Playlist, { through: 'PlaylistSongs' });

User.belongsToMany(User, { as: 'Followers', through: 'UserFollowers', foreignKey: 'userId', otherKey: 'followerId' });

console.log("Database & tables created!");


export { sequelize, User, Playlist, Song };
