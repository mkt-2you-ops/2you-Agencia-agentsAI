import { runtimeSnapshot, payload } from '../runtime-data.js';

export default {
  async fetch() {
    return Response.json(payload('tasks', runtimeSnapshot.tasks), {
      headers: { 'Cache-Control': 'no-store, max-age=0' }
    });
  }
};