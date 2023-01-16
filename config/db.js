const mongoose = require('mongoose');

const dbConnect = async () => {
    mongoose.set('strictQuery', true);
    await mongoose.connect(`${process.env.DB_SERVER}/${process.env.database}`)
        .then(() => console.log('Database connected!'))
        .catch((err) => console.error(err));
}

module.exports = dbConnect; 