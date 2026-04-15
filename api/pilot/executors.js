import { pilotExecutors, pilotPayload } from '../pilot-data.js';

export default {
  async fetch() {
    return Response.json(pilotPayload('executors', pilotExecutors), {
      headers: { 'Cache-Control': 'no-store, max-age=0' }
    });
  }
};