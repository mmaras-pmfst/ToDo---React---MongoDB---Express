require('dotenv').config();
const PORT = process.env.PORT;

const password = process.env.ATLAS_PASS;

const dbname = process.env.NODE_ENV === 'test' ? 'ToDo-test' : 'ToDo';

const DB_URI = `mongodb+srv://dev_marko:${password}@cluster0-m0eke.mongodb.net/${dbname}?retryWrites=true&w=majority`;

module.exports = { PORT, DB_URI };
