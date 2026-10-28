const http = require('node:http');
const { vehicles, routes, bookings, createVehicle, createRoute, createBooking } = require('./store');

const resources = {
  '/api/vehicles': { items: vehicles, create: createVehicle },
  '/api/routes': { items: routes, create: createRoute },
  '/api/bookings': { items: bookings, create: createBooking }
};

async function handler(req, res) {
  const send = (status, data) => {
    res.writeHead(status, { 'content-type': 'application/json; charset=utf-8', 'x-content-type-options': 'nosniff' });
    res.end(JSON.stringify(data));
  };
  const path = new URL(req.url, 'http://localhost').pathname;
  if (path === '/health' && req.method === 'GET') return send(200, { status: 'ok' });
  const resource = resources[path];
  if (!resource) return send(404, { error: 'Not found' });
  if (req.method === 'GET') return send(200, [...resource.items.values()]);
  if (req.method !== 'POST') return send(405, { error: 'Method not allowed' });
  try {
    let body = '';
    for await (const chunk of req) {
      body += chunk;
      if (body.length > 10000) return send(413, { error: 'Payload too large' });
    }
    const data = JSON.parse(body);
    return send(201, resource.create(data));
  } catch (error) {
    return send(400, { error: error instanceof SyntaxError ? 'Invalid JSON' : error.message });
  }
}
const server = http.createServer(handler);
if (require.main === module) server.listen(Number(process.env.PORT) || 3000, '127.0.0.1');
module.exports = { server };
