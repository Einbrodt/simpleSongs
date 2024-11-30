import {Sequelize, DataTypes, Model, Optional} from 'sequelize';
import {Song} from "./song";

interface PlaylistAttributes {
    id: number;
    name: string;
    createdDate: Date;
}

interface PlaylistCreationAttributes extends Optional<PlaylistAttributes, 'id'> {
}

export class Playlist extends Model<PlaylistAttributes, PlaylistCreationAttributes> implements PlaylistAttributes {
    public id!: number;
    public name!: string;
    public createdDate!: Date;
    public ownerId!: number;

    public addSong!: (song: Awaited<Song>) => Promise<void>;
    public getSongs!: () => Promise<Song[]>;
}

export function createPlaylistModel(sequelize: Sequelize): typeof Playlist {
    Playlist.init({
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: new DataTypes.STRING(128),
            allowNull: false,
        },
        createdDate: {
            type: DataTypes.DATE,
            allowNull: false,
        }
    }, {
        tableName: 'playlists',
        sequelize,
    });

    return Playlist;
}
