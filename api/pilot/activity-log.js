import { pilotActivityLog, pilotPayload } from '../pilot-data.js';

export default {
  async fetch() {
    return Response.json(pilotPayload('activity_log', pilotActivityLog), {
      headers: { 'Cache-Control': 'no-store, max-age=0' }
    });
  }
};