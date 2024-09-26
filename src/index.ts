import express from 'express';

import serverConfig from './config/serverConfig';
import sampleQueueProducer from './producers/sampleQueueProducer';
import apirouter from './routes';
import SampleWorker from './workers/SampleWorker';

const app=express();
const PORT=serverConfig.PORT;



app.use('/api',apirouter);

app.listen(PORT,()=>{
    console.log(`server started at :${PORT}`);
    
    SampleWorker('SampleQueue');

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