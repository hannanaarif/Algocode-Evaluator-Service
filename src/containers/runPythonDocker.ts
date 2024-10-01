import { PYTHON_IMAGE } from '../utils/constants';
import createContainer from './containerFactory';
import decodeDockerStream from './dockerHelper';



async function runPython(code:string,inputTestCase:string){

     const rawLogBuffer:Buffer[]=[];

    const runCommand=`echo '${code.replace(/'/g, `'\\"`)}' > test.py && echo '${inputTestCase.replace(/'/g, `'\\"`)}'|python3 test.py`;

    //console.log(runCommand);

    const pythonDockerContainer=await createContainer(PYTHON_IMAGE,[
            '/bin/sh',
            '-c',
            runCommand]
    );
    await pythonDockerContainer.start();
    const loggerStream=await pythonDockerContainer.logs({
        stdout:true,
        stderr:true,
        timestamps:false,
        follow:true
    });

    loggerStream.on('data',(chunk:Buffer)=>{
        rawLogBuffer.push(chunk);
    });

    await new Promise((res)=>{
        loggerStream.on('end',()=>{
            const completeBuffer = Buffer.concat(rawLogBuffer);
            //console.log('completeBuffer',completeBuffer);
            const decodedStream=decodeDockerStream(completeBuffer);
            console.log(decodedStream);
            console.log(decodedStream.stdout);
            res(decodedStream);
        });
    });

    await pythonDockerContainer.remove();

    return pythonDockerContainer;

};

export default runPython;