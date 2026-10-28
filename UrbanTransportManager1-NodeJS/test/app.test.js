const test = require('node:test');
const assert = require('node:assert/strict');
const { server } = require('../src/app');

test('health endpoint', async () => {
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  try {
    const port = server.address().port;
    const response = await fetch(`http://127.0.0.1:${port}/health`);
    assert.equal(response.status, 200);
    assert.deepEqual(await response.json(), { status: 'ok' });
  } finally {
    await new Promise(resolve => server.close(resolve));
  }
});

test('create vehicle validates capacity', async () => {
  const { createVehicle } = require('../src/store');
  assert.throws(() => createVehicle({ plate: 'A1', capacity: -1 }));
  assert.equal(createVehicle({ plate: 'A1', capacity: 10 }).capacity, 10);
});
