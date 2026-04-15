import { runtimeSnapshot } from '../runtime-data.js';

export default {
  async fetch() {
    return Response.json(runtimeSnapshot, {
      headers: { 'Cache-Control': 'no-store, max-age=0' }
    });
  }
};