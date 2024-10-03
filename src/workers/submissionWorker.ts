import { Job ,Worker} from 'bullmq';

import redisConnection from '../config/redisConfig';
import SubmissionJob from '../jobs/submissionJob';
import { SubmissionPayload } from '../types/submissionPayload';


export default function SubmissionWorker(queueName:string){
    new Worker(queueName,
         async (job:Job)=>{
           if(job.name ==='SubmissionJob'){
              const submissionJobInstance=new SubmissionJob(job.data as Record<string,SubmissionPayload>);
              await submissionJobInstance.handle(job);
              return true;
           }
        },
        {connection:redisConnection}
     );
}