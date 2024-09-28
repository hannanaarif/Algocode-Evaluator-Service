import express, { RequestHandler } from 'express';

import serverAdapter from './config/bullBoardUiConfig';
import serverConfig from './config/serverConfig';
import sampleQueueProducer from './producers/sampleQueueProducer';
import apirouter from './routes';

const app=express();
const PORT=serverConfig.PORT;



app.use('/api',apirouter);

app.use('/dashboard',serverAdapter.getRouter() as RequestHandler);


app.listen(PORT,()=>{
    console.log(`server started at :${PORT}`);

    console.log(`BullBoard is running at http://localhost:3000/${PORT}/dashboard1`);
    
    // SampleWorker('SampleQueue');

    void sampleQueueProducer('Samplejob', {
        name: 'Sanket',
        company: 'Microsoft',
        position: 'SDE 2'
    },2);
    void sampleQueueProducer('Samplejob', {
        name: 'Sarthak',
        company: 'Microsoft',
        position: 'SDE 2'
    },1);
    
});