import { Job } from 'bullmq';

import runCPP from '../containers/runCPPDocker';
import { IJob } from '../types/bullmqJobDefination';
import { SubmissionPayload } from '../types/submissionPayload';


export default class SubmissionJob implements IJob{
    name:string;
    payload:Record<string,SubmissionPayload>;
    constructor(payload:Record<string,SubmissionPayload>){
        this.payload=payload;
        this.name=this.constructor.name;
    }

    handle=async(job?:Job)=>{
        if (job) {
            const key = Object.keys(this.payload)[0];
            console.log(this.payload[key].language);
            console.log('this.payload[key].code',this.payload[key].code);
            console.log('this.payload[key].inputCase',this.payload[key].inputCase);
            if (this.payload[key].language === 'CPP') {
                    console.log('about to Evaluated response is',this.payload[key].code,this.payload[key].inputCase);
                    const response = await runCPP(this.payload[key].code, this.payload[key].inputCase);
                    console.log('Evaluated response is', response);
            }
        }
    };

    failed=(job?: Job) => {
       console.log('failed job',job);
    };
};