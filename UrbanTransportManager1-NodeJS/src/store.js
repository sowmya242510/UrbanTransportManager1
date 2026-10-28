const { randomUUID } = require('node:crypto');

const vehicles = new Map();
const routes = new Map();
const bookings = new Map();

function createVehicle({ plate, capacity }) {
  if (typeof plate !== 'string' || !plate.trim() || !Number.isInteger(capacity) || capacity <= 0) {
    throw new Error('plate and positive integer capacity are required');
  }
  const vehicle = { id: randomUUID(), plate: plate.trim(), capacity };
  vehicles.set(vehicle.id, vehicle);
  return vehicle;
}
function createRoute({ origin, destination, fare }) {
  if (typeof origin !== 'string' || !origin.trim() || typeof destination !== 'string' || !destination.trim() || typeof fare !== 'number' || !Number.isFinite(fare) || fare < 0) {
    throw new Error('origin, destination and nonnegative numeric fare are required');
  }
  const route = { id: randomUUID(), origin: origin.trim(), destination: destination.trim(), fare };
  routes.set(route.id, route);
  return route;
}
function createBooking({ passengerName, routeId }) {
  if (typeof passengerName !== 'string' || !passengerName.trim() || !routes.has(routeId)) {
    throw new Error('valid passengerName and routeId are required');
  }
  const booking = { id: randomUUID(), passengerName: passengerName.trim(), routeId };
  bookings.set(booking.id, booking);
  return booking;
}
module.exports = { vehicles, routes, bookings, createVehicle, createRoute, createBooking };
