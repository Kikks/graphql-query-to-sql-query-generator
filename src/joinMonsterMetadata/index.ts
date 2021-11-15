export default {
	ImmutableState: {
		extensions: {
			joinMonster: {
				sqlTable: '"ImmutableStates"',
				sqlPaginate: true,
				orderBy: '"createdAt"',
				uniqueKey: "id"
			}
		}
	},
	Input: {
		extensions: {
			joinMonster: {
				sqlTable: '"Inputs"',
				sqlPaginate: true,
				orderBy: '"createdAt"',
				uniqueKey: "id"
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
						sqlTable: '"FinalizedEpoches"',
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
							`${finalizedEpochTable}."epochInputStateId" = ${epochInputStateTable}.id`
					}
				}
			}
		}
	},
	AccumulatingEpoch: {
		extensions: {
			joinMonster: {
				sqlTable: '"AccumulatingEpoches"',
				uniqueKey: "id",
				sqlPaginate: true,
				orderBy: '"createdAt"'
			}
		},
		fields: {
			inputs: {
				extensions: {
					joinMonster: {
						sqlTable: '"EpochInputStates"',
						uniqueKey: "id",
						sqlJoin: (accumulatingEpochTable: any, epochInputStateTable: any) =>
							`${accumulatingEpochTable}."epochInputStateId" = ${epochInputStateTable}."id"`
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
				orderBy: '"createdAt"'
			}
		}
	},
	DescartesV2State: {
		extensions: {
			joinMonster: {
				sqlTable: '"DescartesV2States"',
				uniqueKey: "block_hash",
				orderBy: '"createdAt"'
			}
		},
		fields: {
			constants: {
				extensions: {
					joinMonster: {
						sqlTable: '"ImmutableStates"',
						uniqueKey: "id",
						sqlJoin: (descartesV2StateTable: any, immutableStateTable: any) =>
							`${descartesV2StateTable}.block_hash = ${immutableStateTable}.descartes_hash`
					}
				}
			},
			finalized_epochs: {
				extensions: {
					joinMonster: {
						sqlTable: '"FinalizedEpochs"',
						uniqueKey: "id",
						sqlJoin: (descartesV2StateTable: any, finalizedEpochsTable: any) =>
							`${descartesV2StateTable}.block_hash = ${finalizedEpochsTable}.descartes_hash`
					}
				}
			},
			current_epoch: {
				extensions: {
					joinMonster: {
						sqlTable: '"AccumulatingEpoches"',
						uniqueKey: "id",
						sqlJoin: (
							descartesV2StateTable: any,
							accumulatingEpochTable: any
						) =>
							`${descartesV2StateTable}.block_hash = ${accumulatingEpochTable}.descartes_hash`
					}
				}
			},
			output_state: {
				extensions: {
					joinMonster: {
						sqlTable: '"OutputStates"',
						uniqueKey: "id",
						sqlJoin: (descartesV2StateTable: any, outputStateTable: any) =>
							`${descartesV2StateTable}.block_hash = ${outputStateTable}.descartes_hash`
					}
				}
			}
		}
	},
	GetSessionStatusResponse: {
		extensions: {
			joinMonster: {
				sqlTable: '"SessionStatuses"',
				sqlPaginate: true,
				orderBy: '"createdAt"',
				uniqueKey: "session_id"
			}
		}
	},
	GetEpochStatusResponse: {
		extensions: {
			joinMonster: {
				sqlTable: '"EpochStatuses"',
				sqlPaginate: true,
				orderBy: '"createdAt"',
				uniqueKey: "session_id"
			}
		}
	}
};
