import express, { Request, Response, NextFunction } from "express";
import { ApolloServer } from "apollo-server-express";
import schema from "./graphql/schemas";
import db from "./db/models";
import redisClient, { connectToRedis } from "./db/redis";

import { startMetricsServer } from "./utils/metrics";

const joinMonsterAdapt = require("join-monster-graphql-tools-adapter");

import joinMonsterMetadata from "./joinMonsterMetadata";

joinMonsterAdapt(schema, joinMonsterMetadata);

const PORT = 4000;

const app = express();

const server = new ApolloServer({
	schema
});

db.sequelize
	.authenticate()
	.then(() => {
		console.log("Connected to database successfully");
	})
	.catch(() => {
		console.error("Error connecting to database");
	});

connectToRedis();

app.use("/graphql", (req: Request, res: Response, next: NextFunction) => {
	const startHrTime = process.hrtime();

	res.on("finish", async () => {
		if (
			req.body &&
			req.body?.operationName &&
			req.body?.operationName !== "IntrospectionQuery"
		) {
			const elapsedHrTime = process.hrtime(startHrTime);
			const elapsedTimeInMs = elapsedHrTime[0] * 1000 + elapsedHrTime[1] / 1e6;

			try {
				const data = await redisClient.get("response_times");
				console.log(data);

				if (data) {
					const responseTimes: number[] = JSON.parse(data);

					if (responseTimes.length >= 100) {
						responseTimes.pop();
						responseTimes.unshift(elapsedTimeInMs);
					} else {
						responseTimes.unshift(elapsedTimeInMs);
					}

					await redisClient.set(
						"response_times",
						JSON.stringify(responseTimes)
					);
				} else {
					await redisClient.set(
						"response_times",
						JSON.stringify([elapsedTimeInMs])
					);
				}
			} catch (error) {
				console.log(error);
			}
		}
	});

	next();
});

server.applyMiddleware({ app, path: "/graphql" });
app.listen(PORT, () => {
	startMetricsServer();
	console.log(
		`\n🚀      GraphQL is now running on http://localhost:${PORT}/graphql`
	);
});
