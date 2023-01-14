const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
const dbConnection = async() => {
    try {
        
        await mongoose.connect( "mongodb+srv://user_node_cafe:regatas123@miclustercafe.6mmvix7.mongodb.net/todoApp", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useCreateIndex: true,
            // useFindAndModify: false
        } );
    
        console.log("Base de datos online")

    } catch (error) {
        console.log(error)
        throw new Error("Error al iniciar la base de datos");
    }
}

module.exports = {
    dbConnection
}


