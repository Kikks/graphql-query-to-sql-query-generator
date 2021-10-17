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
        sqlTable: '"FinalizedEpoches"',
        uniqueKey: "id",
        sqlJoin: (finalizedEpochsTable: any, finalizedEpochTable: any) =>
          `${finalizedEpochsTable}."FinalizedEpochId" = ${finalizedEpochTable}.id`,
      },
    },
  },
  // IntegerBool: {
  //   extensions: {
  //     joinMonster: {
  //       sqlTable: '"IntegerBools"',
  //       uniqueKey: "id",
  //       sqlBatch: {
  //         thisKey: "id",
  //         parentKey: "IntegerBoolId",
  //       },
  //     },
  //   },
  // },
  // IntegerInnerObject: {
  //   extensions: {
  //     joinMonster: {
  //       sqlTable: '"IntegerInnerObjects"',
  //       uniqueKey: "id",
  //       sqlJoin: (integerInnerObjectTable: any, intergerBoolTable: any) =>
  //         `${integerInnerObjectTable}."IntegerBoolId" = ${intergerBoolTable}.id`,
  //       sqlBatch: {
  //         thisKey: "id",
  //         parentKey: "IntegerInnerObjectId",
  //       },
  //     },
  //   },
  // },

  OutputState: {
    extensions: {
      joinMonster: {
        sqlTable: '"OutputStates"',
        uniqueKey: "id",
      },
    },
    fields: {
      outputs: {
        extensions: {
          joinMonster: {
            sqlTable: '"IntegerObjects"',
            uniqueKey: "id",
            sqlJoin: (outputStateTable: any, integerObjectTable: any) =>
              `${outputStateTable}.id = ${integerObjectTable}."IntegerObjectId"`,
          },
        },
      },
    },
  },
  IntegerObject: {
    extensions: {
      joinMonster: {
        sqlTable: '"IntegerObjects"',
        uniqueKey: "id",
      },
      fields: {
        integer: {
          extensions: {
            joinMonster: {
              sqlTable: '"IntegerInnerObjects"',
              uniqueKey: "id",
              sqlBatch: {
                thisKey: '"IntegerInnerObjectId"',
                parentKey: "id",
              },
            },
          },
        },
      },
    },
  },
  IntegerInnerObject: {
    extensions: {
      joinMonster: {
        sqlTable: '"IntegerInnerObjects"',
        uniqueKey: "id",
      },
      fields: {
        integer: {
          extensions: {
            joinMonster: {
              sqlTable: '"IntegerBools"',
              uniqueKey: "id",
              sqlBatch: {
                thisKey: '"IntegerBoolId"',
                parentKey: "id",
              },
            },
          },
        },
      },
    },
  },
  IntegerBool: {
    extensions: {
      joinMonster: {
        sqlTable: '"IntegerBools"',
        uniqueKey: "id",
      },
    },
  },
};
