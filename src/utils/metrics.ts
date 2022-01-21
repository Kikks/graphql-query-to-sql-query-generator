import express from "express";
import client from "prom-client";
import redisClient from "../db/redis";

const app = express();
const PORT = 9000;

export const startMetricsServer = () => {
	const collectDefaultMetrics = client.collectDefaultMetrics;

	collectDefaultMetrics();

	app.get("/metrics", async (req, res) => {
		try {
			const value = await redisClient.get("response_times");
			if (value) {
				console.log(value);
				res.set("Content-Type", client.register.contentType);
				res.send(await client.register.metrics());
			} else {
				res.status(400).send("There was no value... It is friggin empty");
			}
		} catch (error) {
			res.status(500).send(error);
		}
	});

	app.get("/testing", async (req, res) => {
		try {
			const value = await redisClient.get("response_times");
			if (value) {
				res.status(200).send(JSON.parse(value));
			} else {
				res.status(400).send("There was no value... It is friggin empty");
			}
		} catch (error) {
			res.status(500).send(error);
		}
	});

	app.listen(PORT, () => {
		console.log(`Metrics server started at http://localhost:${PORT}`);
	});
};
