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
    });
    /*sampleQueueProducer('Samplejob', {
        name: 'Sanket',
        company: 'Microsoft',
        position: 'SDE 2'
    })
    .then(() => {
        console.log('Job added successfully.');
    })
    .catch((error) => {
        console.error('Error adding job:', error);
    });
    
    console.log('done sample worker');*/

});