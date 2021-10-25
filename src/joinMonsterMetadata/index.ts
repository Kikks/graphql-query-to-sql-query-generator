export default {
	ImmutableState: {
		// map the User object type to its SQL table
		extensions: {
			joinMonster: {
				sqlTable: '"ImmutableStates"',
				sqlPaginate: true,
				orderBy: '"createdAt"',
				uniqueKey: "id"
			}
		}
	},
	FinalizedEpochs: {
		extensions: {
			joinMonster: {
				sqlTable: '"FinalizedEpochs"',
				sqlPaginate: true,
				orderBy: '"createdAt"',
				uniqueKey: "id"
			}
		},
		fields: {
			finalized_epochs: {
				extensions: {
					joinMonster: {
						sqlTable: '"FinalizedEpochs"',
						uniqueKey: "id",
						sqlJoin: (finalizedEpochsTable: any, finalizedEpochTable: any) =>
							`${finalizedEpochsTable}.id = ${finalizedEpochTable}."FinalizedEpochId"`
					}
				}
			}
		}
	},
	FinalizedEpoch: {
		extensions: {
			joinMonster: {
				sqlTable: '"FinalizedEpoches"',
				uniqueKey: "id"
			}
		},
		fields: {
			inputs: {
				extensions: {
					joinMonster: {
						sqlTable: '"EpochInputStates"',
						uniqueKey: "id",
						sqlJoin: (finalizedEpochTable: any, epochInputStateTable: any) =>
							`${finalizedEpochTable}.id = ${epochInputStateTable}."finalizedEpochId"`
					}
				}
			}
		}
	},
	EpochInputState: {
		extensions: {
			joinMonster: {
				sqlTable: '"EpochInputStates"',
				uniqueKey: "id",
				sqlPaginate: true,
				orderBy: '"createdAt"'
			}
		}
	},
	AccumulatingEpoch: {
		extensions: {
			joinMonster: {
				sqlTable: '"AccumulatingEpoches"',
				uniqueKey: "id",
        sqlPaginate: true,
        orderBy: '"createdAt"',
			}
		},
		fields: {
			inputs: {
				extensions: {
					joinMonster: {
						sqlTable: '"EpochInputStates"',
						uniqueKey: "id",
						sqlJoin: (accumulatingEpochTable: any, epochInputStateTable: any) =>
							`${accumulatingEpochTable}.id = ${epochInputStateTable}."accumulatingEpochId"`
					}
				}
			}
		}
	},
	OutputState: {
		extensions: {
			joinMonster: {
				sqlTable: '"OutputStates"',
				uniqueKey: "id",
        sqlPaginate: true,
        orderBy: '"createdAt"',
			}
		},
	},
};
