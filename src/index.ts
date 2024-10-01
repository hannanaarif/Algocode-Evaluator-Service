import express, { RequestHandler } from 'express';

import serverAdapter from './config/bullBoardUiConfig';
import serverConfig from './config/serverConfig';
import runPython from './containers/runPythonDocker';
//import sampleQueueProducer from './producers/sampleQueueProducer';
import apirouter from './routes';
//import SampleWorker from './workers/SampleWorker';

const app=express();
const PORT=serverConfig.PORT;

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to parse URL-encoded bodies (from HTML forms)
app.use(express.urlencoded({ extended: true }));

// Middleware to parse text bodies
app.use(express.text());

app.use('/api',apirouter);

app.use('/dashboard',serverAdapter.getRouter() as RequestHandler);


app.listen(PORT,()=>{
    console.log(`server started at :${PORT}`);

    console.log(`BullBoard is running at http://localhost:${PORT}/dashboard`);
    
    //SampleWorker('SampleQueue');
    
    const code =`x = input()
y = input()
print("value of x is", x)
print("value of y is", y)
`;
    const inputCase = `100
    200`;
    // const code = `
    //       x = input()
    //       y = input()
    //       print("value of x is", x)
    //       print("value of y is", y)`.trim(); 
      
    void runPython(code, inputCase);

    // void sampleQueueProducer('Samplejob', {
    //     name: 'Sanket',
    //     company: 'Microsoft',
    //     position: 'SDE 2'
    // },2);
    // void sampleQueueProducer('Samplejob', {
    //     name: 'Sarthak',
    //     company: 'Microsoft',
    //     position: 'SDE 2'
    // },1);

    
});