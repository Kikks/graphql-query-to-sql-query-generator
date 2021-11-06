import { IResolvers } from "graphql-tools";
import { v4 as uuidv4 } from "uuid";
import {
	FinalizedEpoch,
	EpochInputState,
	FinalizedEpochs,
	ImmutableState,
	AccumulatingEpoch,
	OutputState,
	PhaseState,
	ImmutableStateInput,
	FinalizedEpochsInput,
	AccumulatingEpochInput,
	OutputStateInput,
	DescartesInput,
	DescartesV2State
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

		initial_epoch(): string {
			return "234567890";
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
		},

		async DescartesState(_: void, args, {}, info): Promise<ImmutableState> {
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
			{ input }: { input: ImmutableStateInput[] },
			{}
		): Promise<ImmutableState[]> {
			try {
				const data = [];

				for (const item of input) {
					const newData = await db.ImmutableState.create({
						id: uuidv4(),
						challenge_period: item?.challenge_period,
						contract_creation_timestamp: item?.contract_creation_timestamp,
						descartesv2_contract_address: item?.descartesv2_contract_address,
						dispute_contract_address: item?.dispute_contract_address,
						input_contract_address: item?.input_contract_address,
						input_duration: item?.input_duration,
						output_contract_address: item?.output_contract_address,
						validator_contract_address: item?.validator_contract_address,
						createdAt: new Date(),
						updatedAt: new Date()
					});

					data.push(newData);
				}

				return data;
			} catch (error: any) {
				throw Error(error);
			}
		},

		initial_epoch(_: void, { input }: { input: string }): string {
			return input;
		},

		async finalized_epochs(
			_void,
			{ input }: { input: FinalizedEpochsInput[] }
		): Promise<FinalizedEpochs[]> {
			const data = [];

			try {
				for (const item of input) {
					const parentId = uuidv4();
					const finalized_epochs = [];

					const finalizedEpochs = await db.FinalizedEpochs.create({
						id: parentId,
						initial_epoch: item?.initial_epoch,
						descartesv2_contract_address: item?.descartesv2_contract_address,
						input_contract_address: item?.input_contract_address,
						createdAt: new Date(),
						updatedAt: new Date()
					});

					for (const finalizedEpoch of item?.finalized_epochs) {
						const epochInputStateId = uuidv4();
						let epochInputState: EpochInputState;
						const inputs = [];

						if (finalizedEpoch?.inputs?.inputs) {
							for (const input of finalizedEpoch?.inputs?.inputs) {
								const newInput = await db.Input.create({
									id: uuidv4(),
									sender: input?.sender,
									timestamp: input?.timestamp,
									payload: input?.payload
								});

								inputs.push(newInput.id);
							}
						}

						epochInputState = await db.EpochInputState.create({
							id: epochInputStateId,
							epoch_number: finalizedEpoch?.inputs?.epoch_number,
							inputs,
							input_contract_address:
								finalizedEpoch?.inputs?.input_contract_address,
							createdAt: new Date(),
							updatedAt: new Date()
						});

						const newFinalizedEpoch = await db.FinalizedEpoch.create({
							id: uuidv4(),
							epoch_number: finalizedEpoch?.epoch_number,
							hash: finalizedEpoch?.hash,
							inputs: finalizedEpoch?.inputs,
							finalized_block_hash: finalizedEpoch?.finalized_block_hash,
							finalized_block_number: finalizedEpoch?.finalized_block_number,
							FinalizedEpochId: parentId,
							epochInputStateId,
							createdAt: new Date(),
							updatedAt: new Date()
						});

						newFinalizedEpoch.inputs = epochInputState;
						finalized_epochs.push(newFinalizedEpoch);
					}

					finalizedEpochs.finalized_epochs = finalized_epochs;
					data.push(finalizedEpochs);
				}

				return data;
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
		): Promise<AccumulatingEpoch> {
			try {
				const epochInputStateId = uuidv4();
				const inputIds = [];

				if (inputs?.inputs) {
					for (const input of inputs?.inputs) {
						const newInput = await db.Input.create({
							id: uuidv4(),
							sender: input?.sender,
							timestamp: input?.timestamp,
							payload: input?.payload
						});

						inputIds.push(newInput.id);
					}
				}

				const epochInputState = await db.EpochInputState.create({
					id: epochInputStateId,
					epoch_number: inputs?.epoch_number,
					inputs: inputIds,
					input_contract_address: inputs?.input_contract_address,
					createdAt: new Date(),
					updatedAt: new Date()
				});

				const accumulatingEpoch = await db.AccumulatingEpoch.create({
					id: uuidv4(),
					input_contract_address,
					descartesv2_contract_address,
					epoch_number,
					epochInputStateId,
					createdAt: new Date(),
					updatedAt: new Date()
				});

				accumulatingEpoch.inputs = epochInputState;

				return accumulatingEpoch;
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
		): Promise<OutputState> {
			try {
				const outputState = await db.OutputState.create({
					id: uuidv4(),
					output_address,
					outputs,
					createdAt: new Date(),
					updatedAt: new Date()
				});

				return outputState;
			} catch (error: any) {
				throw new Error(error);
			}
		},

		async DescartesState(
			_: void,
			{ input }: { input: DescartesInput }
		): Promise<DescartesV2State> {
			try {
				const descartes_hash = uuidv4();
				const immutableStateIds: string[] = [];
				const finalizedEpochsIds: string[] = [];
				const accumulatingEpochId = uuidv4();
				const outputStateId = uuidv4();

				const constants: ImmutableState[] = [];
				const finalizedEpochsArray: FinalizedEpochs[] = [];
				let current_epoch: AccumulatingEpoch;
				let output_state: OutputState;

				// Create Immutable States
				try {
					for (const item of input?.constants) {
						const newData = await db.ImmutableState.create({
							id: uuidv4(),
							challenge_period: item?.challenge_period,
							contract_creation_timestamp: item?.contract_creation_timestamp,
							descartesv2_contract_address: item?.descartesv2_contract_address,
							dispute_contract_address: item?.dispute_contract_address,
							input_contract_address: item?.input_contract_address,
							input_duration: item?.input_duration,
							output_contract_address: item?.output_contract_address,
							validator_contract_address: item?.validator_contract_address,
							descartes_hash,
							createdAt: new Date(),
							updatedAt: new Date()
						});

						constants.push(newData);
					}
				} catch (error: any) {
					throw Error(error);
				}

				// Create Finalized Epochs
				try {
					for (const item of input?.finalized_epochs) {
						const parentId = uuidv4();
						const finalized_epochs = [];

						const finalizedEpochs = await db.FinalizedEpochs.create({
							id: parentId,
							initial_epoch: item?.initial_epoch,
							descartesv2_contract_address: item?.descartesv2_contract_address,
							input_contract_address: item?.input_contract_address,
							descartes_hash,
							createdAt: new Date(),
							updatedAt: new Date()
						});

						if (item?.finalized_epochs) {
							for (const finalizedEpoch of item?.finalized_epochs) {
								const epochInputStateId = uuidv4();
								let epochInputState: EpochInputState;
								const inputs = [];

								if (finalizedEpoch?.inputs?.inputs) {
									for (const input of finalizedEpoch?.inputs?.inputs) {
										const newInput = await db.Input.create({
											id: uuidv4(),
											sender: input?.sender,
											timestamp: input?.timestamp,
											payload: input?.payload
										});

										inputs.push(newInput.id);
									}
								}

								epochInputState = await db.EpochInputState.create({
									id: epochInputStateId,
									epoch_number: finalizedEpoch?.inputs?.epoch_number,
									inputs,
									input_contract_address:
										finalizedEpoch?.inputs?.input_contract_address,
									createdAt: new Date(),
									updatedAt: new Date()
								});

								const newFinalizedEpoch = await db.FinalizedEpoch.create({
									id: uuidv4(),
									epoch_number: finalizedEpoch?.epoch_number,
									hash: finalizedEpoch?.hash,
									inputs: finalizedEpoch?.inputs,
									finalized_block_hash: finalizedEpoch?.finalized_block_hash,
									finalized_block_number:
										finalizedEpoch?.finalized_block_number,
									FinalizedEpochId: parentId,
									epochInputStateId,
									createdAt: new Date(),
									updatedAt: new Date()
								});

								newFinalizedEpoch.inputs = epochInputState;
								finalizedEpochsIds.push(newFinalizedEpoch?.id);
								finalized_epochs.push(newFinalizedEpoch);
							}
						}

						finalizedEpochs.finalized_epochs = finalized_epochs;
						finalizedEpochsArray.push(finalizedEpochs);
					}
				} catch (error: any) {
					throw new Error(error);
				}

				// Create Accumulated Epoch
				try {
					const epochInputStateId = uuidv4();
					const inputIds = [];

					if (input?.current_epoch?.inputs?.inputs) {
						for (const item of input?.current_epoch?.inputs?.inputs) {
							const newInput = await db.Input.create({
								id: uuidv4(),
								sender: item?.sender,
								timestamp: item?.timestamp,
								payload: item?.payload
							});

							inputIds.push(newInput.id);
						}
					}

					const epochInputState = await db.EpochInputState.create({
						id: epochInputStateId,
						epoch_number: input?.current_epoch?.inputs?.epoch_number,
						inputs: inputIds,
						input_contract_address:
							input?.current_epoch?.inputs?.input_contract_address,
						createdAt: new Date(),
						updatedAt: new Date()
					});

					const accumulatingEpoch = await db.AccumulatingEpoch.create({
						id: accumulatingEpochId,
						input_contract_address:
							input?.current_epoch?.input_contract_address,
						descartesv2_contract_address:
							input?.current_epoch?.descartesv2_contract_address,
						epoch_number: input?.current_epoch?.epoch_number,
						epochInputStateId,
						descartes_hash,
						createdAt: new Date(),
						updatedAt: new Date()
					});

					accumulatingEpoch.inputs = epochInputState;
					current_epoch = accumulatingEpoch;
				} catch (error: any) {
					throw new Error(error);
				}

				// Create Output State
				try {
					const outputState = await db.OutputState.create({
						id: outputStateId,
						output_address: input?.output_state?.output_address,
						outputs: input?.output_state?.outputs,
						descartes_hash,
						createdAt: new Date(),
						updatedAt: new Date()
					});

					output_state = outputState;
				} catch (error: any) {
					throw new Error(error);
				}

				await db.DescartesV2State.create({
					block_hash: descartes_hash,
					constants: immutableStateIds,
					initial_epoch: input?.initial_epoch,
					finalized_epochs: finalizedEpochsIds,
					current_epoch: accumulatingEpochId,
					current_phase: input?.current_phase,
					output_state: outputStateId,
					createdAt: new Date(),
					updatedAt: new Date()
				});

				return {
					block_hash: descartes_hash,
					constants,
					initial_epoch: input?.initial_epoch,
					finalized_epochs: finalizedEpochsArray,
					current_epoch,
					current_phase: input?.current_phase,
					output_state
				};
			} catch (error: any) {
				throw new Error(error);
			}
		}
	}
};
