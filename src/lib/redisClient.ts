import { createClient } from 'redis';

const client = createClient({
  password: process.env.REDIS_PASSWORD,
  socket: {
      host: 'redis-13290.c98.us-east-1-4.ec2.redns.redis-cloud.com',
      port: 13290
  }
});

client.on('error', (error) => {
  console.error('Redis error', error);
});

(async () => {
  await client.connect();
})();

export default client;
