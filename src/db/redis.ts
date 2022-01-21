import { createClient } from "redis";

const client = createClient();

export const connectToRedis = async () => {
	client.on("error", err => console.log("Redis Client Error", err));

	await client
		.connect()
		.then(() => {
			console.log("Redis database connected");
		})
		.catch(() => {
			console.log("Redis database failed to connect");
		});
};

export default client;
