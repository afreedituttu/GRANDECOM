const app = require('./app');
require('dotenv').config({path:'config/'})
process.on("uncaughtException", (err)=>{
    console.log(`Error ${err.message}`);
    console.log('shutting down the server for handling uncaught exception');
})

require('./db/connection');

const server = app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})

process.on('unhandledRejection', (err)=>{
    console.log(`shutting down the server for error message ${err.message}`);
    console.log('Shutting down the server for unhandled promise rejection');

    server.close(()=>{
        process.exit(1)
    })
})