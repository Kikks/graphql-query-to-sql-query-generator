import { IResolvers } from "graphql-tools";
import { v4 as uuidv4 } from "uuid";
import {
	FinalizedEpoch,
	ImmutableState,
	AccumulatingEpoch,
	OutputState,
	PhaseState,
	ImmutableStateInput,
	FinalizedEpochsInput,
	AccumulatingEpochInput,
	OutputStateInput
} from "../generated-typeDefs";
import joinMonster from "join-monster";
import db from "../../db/models";

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
		},

		async current_epoch(_: void, args, {}, info): Promise<AccumulatingEpoch> {
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
				input
			}: { input: ImmutableStateInput[] },
			{}
		): Promise<ImmutableState[]> {
			try {
				const data = [];

				for(const item of input) {
					const newData = await db.ImmutableState.create({
						id: uuidv4(),
						challenge_period: item?.challenge_period,
						contract_creation_timestamp: item?.contract_creation_timestamp,
						descartesv2_contract_address: item?.descartesv2_contract_address,
						dispute_contract_address: item?.dispute_contract_address,
						input_contract_address: item?.input_contract_address,
						input_duration: item?.input_duration,
						output_contract_address: item?.output_contract_address,
						validator_contract_address: item?.validator_contract_address
					});

					data.push(newData);
				};

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
				input
			}: { input: FinalizedEpochsInput[] }
		): Promise<string> {
			try {
				for (const item of input) {
					const parentId = uuidv4();

					await db.FinalizedEpochs.create({
						id: parentId,
						initial_epoch: item?.initial_epoch,
						descartesv2_contract_address: item?.descartesv2_contract_address,
						input_contract_address: item?.input_contract_address
					});

					for (const finalizedEpoch of item?.finalized_epochs) {
						const nestedParentId = uuidv4();

						await db.FinalizedEpoch.create({
							id: nestedParentId,
							epoch_number: finalizedEpoch?.epoch_number,
							hash: finalizedEpoch?.hash,
							inputs: finalizedEpoch?.inputs,
							finalized_block_hash: finalizedEpoch?.finalized_block_hash,
							finalized_block_number: finalizedEpoch?.finalized_block_number,
							FinalizedEpochId: parentId
						});

						await db.EpochInputState.create({
							id: uuidv4(),
							epoch_number: finalizedEpoch?.inputs?.epoch_number,
							inputs: finalizedEpoch?.inputs?.inputs,
							input_contract_address: finalizedEpoch?.inputs?.input_contract_address,
							finalizedEpochId: nestedParentId
						});
					}
				}

				return "The FinalEpochs have been created successfully";
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
					epoch_number,
					inputs
				}
			}: { input: AccumulatingEpochInput }
		): Promise<string> {
			try {
				const parentId = uuidv4()

				await db.AccumulatingEpoch.create({
					id: parentId,
					input_contract_address,
					descartesv2_contract_address,
					epoch_number
				});

				await db.EpochInputState.create({
					id: uuidv4(),
					epoch_number: inputs?.epoch_number ,
					inputs: inputs?.inputs ,
					input_contract_address: inputs?.input_contract_address,
					accumulatingEpochId: parentId
				})

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
			{ input: { output_address, outputs } }: { input: OutputStateInput }
		) {
			try {
				await db.OutputState.create({
					id: uuidv4(),
					output_address,
					outputs
				});

				return "The Output state has been created successfully";
			} catch (error: any) {
				throw new Error(error);
			}
		}
	}
};
