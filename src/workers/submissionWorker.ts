import { Job ,Worker} from 'bullmq';

import redisConnection from '../config/redisConfig';
import SubmissionJob from '../jobs/submissionJob';
import { SubmissionPayload } from '../types/submissionPayload';


export default function SubmissionWorker(queueName:string){
    new Worker(queueName,
         async (job:Job)=>{
           console.log('Submission Job job worker kicking');
           console.log('job name:-',job.name);

           if(job.name ==='SubmissionJob'){
            console.log('job name:-',job.name);
            console.log('job data:-',job.data);
              const submissionJobInstance=new SubmissionJob(job.data as Record<string,SubmissionPayload>);
              await submissionJobInstance.handle(job);
              return true;
           }
        },
        {connection:redisConnection}
     );
}