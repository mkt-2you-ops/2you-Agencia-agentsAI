import { pilotWorkspace } from '../pilot-data.js';

export default {
  async fetch() {
    return Response.json({
      meta: { source: 'pilot-mono-workspace', entity: 'workspace' },
      workspace: pilotWorkspace
    }, {
      headers: { 'Cache-Control': 'no-store, max-age=0' }
    });
  }
};