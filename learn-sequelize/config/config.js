require('dotenv').config();

module.exports = {
development: {
username: process.env.DB_USERNAME ,
password: process.env.DB_PASSWORD ,
database: process.env.DB_NAME || 'nodejs',
host: process.env.DB_HOST || '127.0.0.1',
dialect: process.env.DB_DIALECT || 'mysql'
},

test: {
username: process.env.DB_USERNAME || 'root',
password: process.env.DB_PASSWORD || null,
database: process.env.DB_TEST_NAME || 'database_test',
host: process.env.DB_HOST || '127.0.0.1',
dialect: process.env.DB_DIALECT || 'mysql'
},

production: {
username: process.env.DB_USERNAME || 'root',
password: process.env.DB_PASSWORD || null,
database: process.env.DB_PROD_NAME || 'database_production',
host: process.env.DB_HOST || '127.0.0.1',
dialect: process.env.DB_DIALECT || 'mysql'
}
};
