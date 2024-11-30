import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import {Song} from "./song";

interface UserAttributes {
    id: number;
    name: string;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    public id!: number;
    public name!: string;

    public addFollower!: (follower: User) => Promise<void>;
    public getFollowers!: () => Promise<User[]>;
}

export function createUserModel(sequelize: Sequelize): typeof User {
    User.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: new DataTypes.STRING(128),
            allowNull: false,
        }
    }, {
        tableName: 'users',
        sequelize,
    });

    return User;
}
