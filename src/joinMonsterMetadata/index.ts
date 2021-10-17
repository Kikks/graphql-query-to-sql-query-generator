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
      },
    },
    fields: {
      finalized_epochs: {
        extensions: {
          joinMonster: {
            sqlTable: '"FinalizedEpochs"',
            uniqueKey: "id",
            sqlJoin: (finalizedEpochsTable: any, finalizedEpochTable: any) =>
              `${finalizedEpochsTable}.id = ${finalizedEpochTable}."FinalizedEpochId"`,
          },
        },
      },
    },
  },
  FinalizedEpoch: {
    extensions: {
      joinMonster: {
        sqlTable: '"FinalizedEpoches"',
        uniqueKey: "id",
      },
    },
    fields: {
      inputs: {
        extensions: {
          joinMonster: {
            sqlTable: '"EpochInputStates"',
            uniqueKey: "id",
            sqlJoin: (finalizedEpochTable: any, epochInputStateTable: any) =>
              `${finalizedEpochTable}.id = ${epochInputStateTable}."finalizedEpochId"`,
         
          },
        },
      },
    },
  },
  EpochInputState: {
    extensions: {
      joinMonster: {
        sqlTable: '"EpochInputStates"',
        uniqueKey: "id",
      },
    },
  },
  AccumulatingEpoch: {
    extensions: {
      joinMonster: {
        sqlTable: '"AccumulatingEpoches"',
        uniqueKey: 'id'
      }
    },
    fields: {
      inputs: {
        extensions: {
          joinMonster: {
            sqlTable: '"EpochInputStates"',
            uniqueKey: 'id',
            sqlJoin: (accumulatingEpochTable: any, epochInputStateTable: any) =>
              `${accumulatingEpochTable}.id = ${epochInputStateTable}."accumulatingEpochId"`,
          
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
      },
    },
    fields: {
      outputs: {
        extensions: {
          joinMonster: {
            sqlTable: '"IntegerObjects"',
            uniqueKey: "id",
            sqlJoin: (outputStateTable: any, integerObjectTable: any) =>
              `${outputStateTable}.id = ${integerObjectTable}."outputStateId"`,
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
    },
    fields: {
      integer: {
        extensions: {
          joinMonster: {
            sqlTable: '"IntegerInnerObjects"',
            uniqueKey: "id",
            sqlJoin: (integerObjectTable: any, integerInnerObjectTable: any) =>
              `${integerObjectTable}.id = ${integerInnerObjectTable}."integerObjectId"`
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
    },
    fields: {
      integer: {
        extensions: {
          joinMonster: {
            sqlTable: '"IntegerBools"',
            uniqueKey: "id",
            sqlJoin: (integerInnerObjectTable: any, interBoolTable: any) =>
              `${integerInnerObjectTable}.id = ${interBoolTable}."integerInnerObjectId"`
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
