export const databaseConfig = {
    relational: {
        host: 'localhost',
        port: 5432,
        username: 'your_username',
        password: 'your_password',
        database: 'executive_hiring_platform',
        dialect: 'postgres', // or 'mysql', 'sqlite', etc.
    },
    noSQL: {
        uri: 'mongodb://localhost:27017',
        database: 'executive_hiring_platform',
    },
};