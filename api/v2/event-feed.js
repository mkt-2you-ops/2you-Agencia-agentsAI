import { runtimeSnapshot, payload } from '../runtime-data.js';

export default {
  async fetch() {
    return Response.json(payload('events', runtimeSnapshot.events), {
      headers: { 'Cache-Control': 'no-store, max-age=0' }
    });
  }
};