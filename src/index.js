const express = require('express');

const { ServerConfig } = require('./config');
const apiRoutes = require('./routes');
app = express();
app.use(express.json()); //to make express understand that the incoming payload is a json object
app.use(express.urlencoded({extended:true}));
app.use('/api',apiRoutes);
app.listen(ServerConfig.PORT, () => {
    console.log(`Successfully started the server on PORT : ${ServerConfig.PORT}`);
});
