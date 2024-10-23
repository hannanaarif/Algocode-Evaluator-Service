import { createBullBoard } from '@bull-board/api';
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter';
import { ExpressAdapter } from '@bull-board/express';

import SampleQueue from '../queues/SampleQueue';
import submissionQueue from '../queues/submissionQueue';
import evaluationQueue from '../queues/evaluationQueue';



const serverAdapter=new ExpressAdapter();

serverAdapter.setBasePath('/dashboard');

createBullBoard({
    queues:[new BullMQAdapter(SampleQueue),new BullMQAdapter(submissionQueue),new BullMQAdapter(evaluationQueue)],
    serverAdapter

});



export default serverAdapter;