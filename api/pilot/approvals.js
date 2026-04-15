import { pilotApprovals, pilotPayload } from '../pilot-data.js';

export default {
  async fetch() {
    return Response.json(pilotPayload('approvals', pilotApprovals), {
      headers: { 'Cache-Control': 'no-store, max-age=0' }
    });
  }
};