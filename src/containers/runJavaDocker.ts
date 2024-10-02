
import { JAVA_IMAGE } from '../utils/constants';
import createContainer from './containerFactory';
import decodeDockerStream from './dockerHelper';



async function runJava(code:string,inputTestCase:string){
   const rawLogBuffer:Buffer[]=[];

   const runCommand=`echo '${code.replace(/'/g, `'\\"`)}' > Main.java && javac Main.java && echo '${inputTestCase.replace(/'/g, `'\\"`)}' | java Main`;

   const javaDockerContainer=await createContainer(JAVA_IMAGE,['/bin/sh','-c',runCommand]);

   await javaDockerContainer.start();

   const loggerStream=await javaDockerContainer.logs({
       stdout: true,
       stderr: true,
       timestamps: false,
       follow: true
   });

   loggerStream.on('data',(chunks:Buffer)=>{
       rawLogBuffer.push(chunks);
   });
   await new Promise((res) => {
    loggerStream.on('end', () => {
        // Concatenate all collected log chunks into one complete buffer
        const completeStreamData = Buffer.concat(rawLogBuffer);

        // Decode the complete log stream
        const decodedStream = decodeDockerStream(completeStreamData);

        // Log the decoded stream for debugging purposes
        console.log(decodedStream);

        // Resolve the promise with the decoded log stream
        res(decodedStream);
      });
   });
   await javaDockerContainer.remove();
};
export default runJava;