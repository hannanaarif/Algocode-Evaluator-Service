import express from 'express';

import serverConfig from './config/serverConfig';
import apirouter from './routes';
const app=express();
const PORT=serverConfig.PORT;



app.use('/api',apirouter);

app.listen(PORT,()=>{
    console.log('Aarif');
    console.log(`server started at *:${PORT}`);
});