import { IResolvers } from "graphql-tools";
import { v4 as uuidv4 } from "uuid";
import {
	FinalizedEpoch,
	ImmutableState,
	OutputState,
	PhaseState,
	ImmutableStateInput,
	FinalizedEpochsInput,
	AccumulatingEpochInput,
	OutputStateInput
} from "../generated-typeDefs";
import joinMonster from "join-monster";
import db from "../../db/models";

// Models
const { model } = require("../../db/models/immutablestate");
console.log(model);

export const UserResolvers: IResolvers = {
	Query: {
		async constants(_: void, args, {}, info): Promise<ImmutableState> {
			try {
				return joinMonster(info, args, (sql: any) => {
					console.log(sql);

					return db.sequelize.query(sql, {
						type: db.sequelize.QueryTypes.SELECT
					});
				});
			} catch (error: any) {
				throw Error(error);
			}
		},

		initial_epoch(): number {
			return 4;
		},

		async finalized_epochs(_: void, args, {}, info): Promise<FinalizedEpoch> {
			try {
				return joinMonster(info, args, (sql: any) => {
					console.log(sql);

					return db.sequelize.query(sql, {
						type: db.sequelize.QueryTypes.SELECT
					});
				});
			} catch (error: any) {
				throw Error(error);
			}
		},

		current_phase(): PhaseState {
			return PhaseState.AwaitingConsensusAfterConflict;
		},

		async output_state(_: void, args, {}, info): Promise<OutputState> {
			try {
				return joinMonster(info, args, (sql: any) => {
					console.log(sql);

					return db.sequelize.query(sql, {
						type: db.sequelize.QueryTypes.SELECT
					});
				});
			} catch (error: any) {
				throw Error(error);
			}
		}
	},

	Mutation: {
		async constants(
			_: void,
			{
				input: {
					challenge_period,
					contract_creation_timestamp,
					descartesv2_contract_address,
					dispute_contract_address,
					input_contract_address,
					input_duration,
					output_contract_address,
					validator_contract_address
				}
			}: { input: ImmutableStateInput },
			{}
		): Promise<ImmutableState> {
			try {
				const data = await db.ImmutableState.create({
					id: uuidv4(),
					challenge_period,
					contract_creation_timestamp,
					descartesv2_contract_address,
					dispute_contract_address,
					input_contract_address,
					input_duration,
					output_contract_address,
					validator_contract_address
				});

				return data;
			} catch (error: any) {
				throw Error(error);
			}
		},

		initial_epoch(_: void, { input }: { input: number }): number {
			return input;
		},

		async finalized_epochs(
			_void,
			{
				input: {
					initial_epoch,
					descartesv2_contract_address,
					input_contract_address
				}
			}: { input: FinalizedEpochsInput }
		): Promise<string> {
			try {
				await db.FinalizedEpochs.create({
					id: uuidv4(),
					initial_epoch,
					descartesv2_contract_address,
					input_contract_address
				});

				return "The FinalEpochs has been created successfully";
			} catch (error: any) {
				throw new Error(error);
			}
		},

		async current_epoch(
			_: void,
			{
				input: {
					input_contract_address,
					descartesv2_contract_address,
					epoch_number
				}
			}: { input: AccumulatingEpochInput }
		): Promise<string> {
			try {
				await db.AccumulatingEpoch.create({
					id: uuidv4(),
					input_contract_address,
					descartesv2_contract_address,
					epoch_number
				});

				return "The AccumulatingEpoch has bee created sucessfully";
			} catch (error: any) {
				throw new Error(error);
			}
		},

		current_phase(_: void, { input }: { input: PhaseState }): PhaseState {
			return input;
		},

		async output_state(
			_: void,
			{ input: { output_address } }: { input: OutputStateInput }
		) {
			try {
				await db.OutputState.create({
					id: uuidv4(),
					output_address
				});

				return "The Output state has been created successfully";
			} catch (error: any) {
				throw new Error(error);
			}
		}
	}
};
