import { sequelize } from '../models';

beforeAll(async () => {
    await sequelize.sync({ force: true }); // Drop and recreate tables
});

afterAll(async () => {
    await sequelize.close();
});
