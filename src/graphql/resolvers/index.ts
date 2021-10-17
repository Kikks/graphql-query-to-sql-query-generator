import { IResolvers } from "graphql-tools";
import { FinalizedEpoch, ImmutableState, OutputState, PhaseState } from "../generated-typeDefs";
import joinMonster from "join-monster";
import db from "../../db/models";

export const UserResolvers: IResolvers = {
  Query: {
    async constants(_: void, args, { }, info): Promise<ImmutableState> {
      try {
        return joinMonster(info, args, (sql: any) => {
          console.log(sql);

          return db.sequelize.query(sql, {
            type: db.sequelize.QueryTypes.SELECT,
          });
        });
      } catch (error: any) {
        throw Error(error);
      }
    },

    initial_epoch(): number {
      return 4
    },

    async finalized_epochs(_: void, args, {}, info): Promise<FinalizedEpoch> {
      try {
        return joinMonster(info, args, (sql: any) => {
          console.log(sql);

          return db.sequelize.query(sql, {
            type: db.sequelize.QueryTypes.SELECT,
          });
        });
      } catch (error: any) {
        throw Error(error);
      }
    },

    current_phase(): PhaseState {
      return  PhaseState.AwaitingConsensusAfterConflict   
    },

    async output_state(_: void, args, {}, info): Promise<OutputState> {
      try {
        return joinMonster(info, args, (sql: any) => {
          console.log(sql);

          return db.sequelize.query(sql, {
            type: db.sequelize.QueryTypes.SELECT
          })
        })
      } catch (error: any) {
        throw Error(error);
      }
    }
  },
};
