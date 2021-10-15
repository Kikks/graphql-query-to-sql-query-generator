export default {
  ImmutableState: {
    // map the User object type to its SQL table
    extensions: {
      joinMonster: {
        sqlTable: '"ImmutableStates"',
        uniqueKey: "id",
      },
    },
  },
  FinalizedEpochs: {
    extensions: {
      joinMonster: {
        sqlTable: '"FinalizedEpochs"',
        uniqueKey: "id",
        sqlJoin: (finalizedEpochsTable: any, finalizedEpochTable: any) => {
          `${finalizedEpochsTable}."FinalizedEpochId" = ${finalizedEpochTable}.id`;
        },
      },
    },
  },
  //   FinalizedEpochs: {
  //     // Name of the table for finalized epochs
  //     sqlTable: "",
  //     // Unique key for for finalized epochs
  //     uniqueKey: "id",
  //   },
  //   AccumulatingEpoch: {
  //     // Name of the table for accumulating epochs
  //     sqlTable: "",
  //     // Unique key for for accumulating epochs
  //     uniqueKey: "id",
  //   },
  //   PhaseState: {
  //     // Name of the table for phase state
  //     sqlTable: "",
  //     // Unique key for phase state
  //     uniqueKey: "id",
  //   },
  //   OutputState: {
  //     // Name of the table for output state
  //     sqlTable: "",
  //     // Unique key for for output state
  //     uniqueKey: "id",
  //   },
};
