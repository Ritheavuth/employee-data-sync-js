import { dbConfig } from "../config/db";
const { Pool } = require('pg');

const pool = new Pool(dbConfig);

pool.connect((err, client, done) => {
  if (err) {
    console.error('Error connecting to PostgreSQL database', err);
    return;
  }
  console.log('Connected to PostgreSQL database');

  const query = client.query('LISTEN my_channel');

  query.on('error', (error) => {
    console.error('Error listening to PostgreSQL channel', error);
  });

  query.on('notification', (notification) => {
    console.log('Received notification from PostgreSQL channel:', notification.payload);
    // Handle the notification payload here
  });

  client.on('end', () => {
    console.log('Disconnected from PostgreSQL database');
    process.exit(1);
  });
});
;

pool.connect((err, client, done) => {
  if (err) {
    console.error('Error connecting to PostgreSQL database', err);
    return;
  }
  console.log('Connected to PostgreSQL database');

  const query = client.query('LISTEN my_channel');

  query.on('error', (error) => {
    console.error('Error listening to PostgreSQL channel', error);
  });

  query.on('notification', (notification) => {
    console.log('Received notification from PostgreSQL channel:', notification.payload);
    // Handle the notification payload here
  });

  client.on('end', () => {
    console.log('Disconnected from PostgreSQL database');
    process.exit(1);
  });
});
