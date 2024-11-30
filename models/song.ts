import { Sequelize, DataTypes, Model, Optional } from 'sequelize';

interface SongAttributes {
    id: number;
    title: string;
    interpret: string;
}

interface SongCreationAttributes extends Optional<SongAttributes, 'id'> {}

export class Song extends Model<SongAttributes, SongCreationAttributes> implements SongAttributes {
    public id!: number;
    public title!: string;
    public interpret!: string;
}

export function createSongModel(sequelize: Sequelize): typeof Song {
    Song.init({
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        title: {
            type: new DataTypes.STRING(128),
            allowNull: false,
        },
        interpret: {
            type: new DataTypes.STRING(128),
            allowNull: false,
        }
    }, {
        tableName: 'songs',
        sequelize,
    });

    return Song;
}
