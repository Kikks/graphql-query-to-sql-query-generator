import express from "express";
import client from "prom-client";
import redisClient from "../db/redis";
import db from "../db/models";

const app = express();
const PORT = 9000;

export const answeredQueryCounter = new client.Counter({
	name: "answered_queries",
	help: "Number of answered queries"
});

const getAverageResponseTime = async () => {
	const value = await redisClient.get("response_times");

	if (value) {
		const parsedValues: number[] = JSON.parse(value);
		const averageResponseTime =
			parsedValues.reduce((a, b) => a + b) / parsedValues.length;

		return averageResponseTime;
	} else {
		return 0;
	}
};

const getFinalizedEpochsDetails = async () => {
	try {
		const latestFinalizedEpochs = await db.FinalizedEpochs.findOne({
			order: [["createdAt", "DESC"]]
		});

		if (latestFinalizedEpochs) {
			const dapp_contract_address =
				latestFinalizedEpochs?.dapp_contract_address;
			let block_number: string | null = null;
			let block_hash: string | null = null;
			let number_of_processed_inputs: number | null = null;

			const latestFinalizedEpoch = await db.FinalizedEpoch.findOne({
				where: { FinalizedEpochId: latestFinalizedEpochs?.id },
				order: [["createdAt", "DESC"]]
			});

			if (latestFinalizedEpoch) {
				block_number = latestFinalizedEpoch?.finalized_block_number;
				block_hash = latestFinalizedEpoch?.finalized_block_hash;

				const epochInputStates = await db.EpochInputState.findAll({
					where: { id: latestFinalizedEpoch?.epochInputStateId },
					order: [["createdAt", "DESC"]]
				});

				number_of_processed_inputs = epochInputStates.length;
			}

			return {
				block_number,
				block_hash,
				number_of_processed_inputs,
				dapp_contract_address
			};
		} else {
			return {
				block_number: null,
				block_hash: null,
				number_of_processed_inputs: null,
				dapp_contract_address: null
			};
		}
	} catch (error: any) {
		throw new Error(
			error || "There was an error while getting Finalized Epoch Details"
		);
	}
};

export const startMetricsServer = () => {
	const collectDefaultMetrics = client.collectDefaultMetrics;

	collectDefaultMetrics();

	app.get("/metrics", async (req, res) => {
		try {
			let response: string;
			const metrics = await client.register.metrics();

			const averageResponseTime = await getAverageResponseTime();

			const {
				block_number,
				block_hash,
				number_of_processed_inputs,
				dapp_contract_address
			} = await getFinalizedEpochsDetails();

			response = `
				${averageResponseTime &&
					`
# HELP average_response_time Average response time of requests in milliseconds
# TYPE average_response_time counter
average_response_time ${averageResponseTime} 
				`}
				${block_number &&
					`
# HELP block_number Block number of the last finalized epoch
# TYPE block_number counter
block_number ${block_number} 
				`}
				${block_hash &&
					`
# HELP block_hash Block hash of the last finalized epoch
# TYPE block_hash counter
block_hash ${block_hash} 
				`}
				${number_of_processed_inputs &&
					`
# HELP number_of_processed_inputs Number of processed inputs in the last finalized epoch
# TYPE number_of_processed_inputs counter
number_of_processed_inputs ${number_of_processed_inputs} 
				`}
				${dapp_contract_address &&
					`
# HELP dapp_contract_address Dapp contract address of the last finalized epoch
# TYPE dapp_contract_address counter
dapp_contract_address ${dapp_contract_address} 
				`}
				\n${metrics}
			`;
			res.set("Content-Type", client.register.contentType);
			res.send(response);
		} catch (error) {
			res
				.status(500)
				.send({ error: error || "There was an error while gathering metrics" });
		}
	});

	app.listen(PORT, () => {
		console.log(`Metrics server started at http://localhost:${PORT}`);
	});
};
