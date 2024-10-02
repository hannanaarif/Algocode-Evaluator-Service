import { CPP_IMAGE } from '../utils/constants';
import createContainer from './containerFactory';
import decodeDockerStream from './dockerHelper';




async function runCPP(code:string,inputTestCase:string){
  const rawLogBuffer:Buffer[]=[];

  const runCommand=`echo '${code.replace(/'/g, `'\\"`)}' > main.cpp && g++ main.cpp -o main && echo '${inputTestCase.replace(/'/g, `'\\"`)}' | ./main`;

  console.log(runCommand);
  console.log('Initialising a new cpp docker container');

  const cppDockercontainer= await createContainer(CPP_IMAGE,['/bin/sh','-c',runCommand]);
  
  await cppDockercontainer.start();

  const loggerStream=await cppDockercontainer.logs({
    stdout:true,
    stderr:true,
    timestamps:false,
    follow:true
  });

  loggerStream.on('data',(chunk:Buffer)=>{
    rawLogBuffer.push(chunk);
  });
  
  loggerStream.on('end',()=>{
    const completeBuffer=Buffer.concat(rawLogBuffer);
    const decodedStream=decodeDockerStream(completeBuffer);
    console.log(decodedStream);
  });

};
export default runCPP;