import { pilotJobs, pilotPayload } from '../pilot-data.js';

export default {
  async fetch() {
    return Response.json(pilotPayload('jobs', pilotJobs), {
      headers: { 'Cache-Control': 'no-store, max-age=0' }
    });
  }
};