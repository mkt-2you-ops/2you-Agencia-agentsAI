import { pilotTasks, pilotPayload } from '../pilot-data.js';

export default {
  async fetch() {
    return Response.json(pilotPayload('tasks', pilotTasks), {
      headers: { 'Cache-Control': 'no-store, max-age=0' }
    });
  }
};