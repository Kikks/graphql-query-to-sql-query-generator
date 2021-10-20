import { GraphQLResolveInfo } from 'graphql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type AccumulatingEpoch = {
  __typename?: 'AccumulatingEpoch';
  descartesv2_contract_address: Scalars['String'];
  epoch_number: Scalars['Int'];
  id: Scalars['ID'];
  input_contract_address: Scalars['String'];
  inputs: EpochInputState;
};

export type AccumulatingEpochInput = {
  descartesv2_contract_address: Scalars['String'];
  epoch_number: Scalars['Int'];
  input_contract_address: Scalars['String'];
};

export type EpochInputState = {
  __typename?: 'EpochInputState';
  epoch_number: Scalars['Int'];
  id: Scalars['ID'];
  input_contract_address: Scalars['String'];
  inputs: Array<Maybe<Scalars['Int']>>;
};

export type FinalizedEpoch = {
  __typename?: 'FinalizedEpoch';
  epoch_number: Scalars['Int'];
  finalized_block_hash: Scalars['String'];
  finalized_block_number: Scalars['Int'];
  hash: Scalars['Int'];
  id: Scalars['ID'];
  inputs: EpochInputState;
};

export type FinalizedEpochs = {
  __typename?: 'FinalizedEpochs';
  descartesv2_contract_address: Scalars['String'];
  finalized_epochs: Array<Maybe<FinalizedEpoch>>;
  id: Scalars['ID'];
  initial_epoch: Scalars['Int'];
  input_contract_address: Scalars['String'];
};

export type FinalizedEpochsInput = {
  descartesv2_contract_address: Scalars['String'];
  initial_epoch: Scalars['Int'];
  input_contract_address: Scalars['String'];
};

export type ImmutableState = {
  __typename?: 'ImmutableState';
  challenge_period: Scalars['Int'];
  contract_creation_timestamp: Scalars['Int'];
  descartesv2_contract_address: Scalars['String'];
  dispute_contract_address: Scalars['String'];
  id: Scalars['ID'];
  input_contract_address: Scalars['String'];
  input_duration: Scalars['Int'];
  output_contract_address: Scalars['String'];
  validator_contract_address: Scalars['String'];
};

export type ImmutableStateInput = {
  challenge_period: Scalars['Int'];
  contract_creation_timestamp: Scalars['Int'];
  descartesv2_contract_address: Scalars['String'];
  dispute_contract_address: Scalars['String'];
  input_contract_address: Scalars['String'];
  input_duration: Scalars['Int'];
  output_contract_address: Scalars['String'];
  validator_contract_address: Scalars['String'];
};

export type IntegerBool = {
  __typename?: 'IntegerBool';
  id: Scalars['ID'];
  integer: Scalars['Boolean'];
};

export type IntegerInnerObject = {
  __typename?: 'IntegerInnerObject';
  id: Scalars['ID'];
  integer?: Maybe<IntegerBool>;
};

export type IntegerObject = {
  __typename?: 'IntegerObject';
  id: Scalars['ID'];
  integer?: Maybe<IntegerInnerObject>;
};

export type Mutation = {
  __typename?: 'Mutation';
  constants: ImmutableState;
  current_epoch: Scalars['String'];
  current_phase: PhaseState;
  finalized_epochs: Scalars['String'];
  initial_epoch: Scalars['Int'];
  output_state: Scalars['String'];
};


export type MutationConstantsArgs = {
  input: ImmutableStateInput;
};


export type MutationCurrent_EpochArgs = {
  input: AccumulatingEpochInput;
};


export type MutationCurrent_PhaseArgs = {
  input: PhaseState;
};


export type MutationFinalized_EpochsArgs = {
  input: FinalizedEpochsInput;
};


export type MutationInitial_EpochArgs = {
  input: Scalars['Int'];
};


export type MutationOutput_StateArgs = {
  input: OutputStateInput;
};

export type OutputState = {
  __typename?: 'OutputState';
  id: Scalars['ID'];
  output_address: Scalars['String'];
  outputs?: Maybe<IntegerObject>;
};

export type OutputStateInput = {
  output_address: Scalars['String'];
};

export enum PhaseState {
  AwaitingConsensusAfterConflict = 'AwaitingConsensusAfterConflict',
  AwaitingConsensusNoConflict = 'AwaitingConsensusNoConflict',
  AwaitingDispute = 'AwaitingDispute',
  ConsensusTimeout = 'ConsensusTimeout',
  EpochSealedAwaitingFirstClaim = 'EpochSealedAwaitingFirstClaim',
  InputAccumulation = 'InputAccumulation'
}

export type Query = {
  __typename?: 'Query';
  constants?: Maybe<ImmutableState>;
  current_epoch?: Maybe<AccumulatingEpoch>;
  current_phase?: Maybe<PhaseState>;
  finalized_epochs?: Maybe<FinalizedEpochs>;
  initial_epoch: Scalars['Int'];
  output_state?: Maybe<OutputState>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  AccumulatingEpoch: ResolverTypeWrapper<AccumulatingEpoch>;
  AccumulatingEpochInput: AccumulatingEpochInput;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  EpochInputState: ResolverTypeWrapper<EpochInputState>;
  FinalizedEpoch: ResolverTypeWrapper<FinalizedEpoch>;
  FinalizedEpochs: ResolverTypeWrapper<FinalizedEpochs>;
  FinalizedEpochsInput: FinalizedEpochsInput;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  ImmutableState: ResolverTypeWrapper<ImmutableState>;
  ImmutableStateInput: ImmutableStateInput;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  IntegerBool: ResolverTypeWrapper<IntegerBool>;
  IntegerInnerObject: ResolverTypeWrapper<IntegerInnerObject>;
  IntegerObject: ResolverTypeWrapper<IntegerObject>;
  Mutation: ResolverTypeWrapper<{}>;
  OutputState: ResolverTypeWrapper<OutputState>;
  OutputStateInput: OutputStateInput;
  PhaseState: PhaseState;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AccumulatingEpoch: AccumulatingEpoch;
  AccumulatingEpochInput: AccumulatingEpochInput;
  Boolean: Scalars['Boolean'];
  EpochInputState: EpochInputState;
  FinalizedEpoch: FinalizedEpoch;
  FinalizedEpochs: FinalizedEpochs;
  FinalizedEpochsInput: FinalizedEpochsInput;
  ID: Scalars['ID'];
  ImmutableState: ImmutableState;
  ImmutableStateInput: ImmutableStateInput;
  Int: Scalars['Int'];
  IntegerBool: IntegerBool;
  IntegerInnerObject: IntegerInnerObject;
  IntegerObject: IntegerObject;
  Mutation: {};
  OutputState: OutputState;
  OutputStateInput: OutputStateInput;
  Query: {};
  String: Scalars['String'];
};

export type AccumulatingEpochResolvers<ContextType = any, ParentType extends ResolversParentTypes['AccumulatingEpoch'] = ResolversParentTypes['AccumulatingEpoch']> = {
  descartesv2_contract_address?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  epoch_number?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  input_contract_address?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  inputs?: Resolver<ResolversTypes['EpochInputState'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type EpochInputStateResolvers<ContextType = any, ParentType extends ResolversParentTypes['EpochInputState'] = ResolversParentTypes['EpochInputState']> = {
  epoch_number?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  input_contract_address?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  inputs?: Resolver<Array<Maybe<ResolversTypes['Int']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FinalizedEpochResolvers<ContextType = any, ParentType extends ResolversParentTypes['FinalizedEpoch'] = ResolversParentTypes['FinalizedEpoch']> = {
  epoch_number?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  finalized_block_hash?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  finalized_block_number?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  hash?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  inputs?: Resolver<ResolversTypes['EpochInputState'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FinalizedEpochsResolvers<ContextType = any, ParentType extends ResolversParentTypes['FinalizedEpochs'] = ResolversParentTypes['FinalizedEpochs']> = {
  descartesv2_contract_address?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  finalized_epochs?: Resolver<Array<Maybe<ResolversTypes['FinalizedEpoch']>>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  initial_epoch?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  input_contract_address?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ImmutableStateResolvers<ContextType = any, ParentType extends ResolversParentTypes['ImmutableState'] = ResolversParentTypes['ImmutableState']> = {
  challenge_period?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  contract_creation_timestamp?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  descartesv2_contract_address?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  dispute_contract_address?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  input_contract_address?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  input_duration?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  output_contract_address?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  validator_contract_address?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type IntegerBoolResolvers<ContextType = any, ParentType extends ResolversParentTypes['IntegerBool'] = ResolversParentTypes['IntegerBool']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  integer?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type IntegerInnerObjectResolvers<ContextType = any, ParentType extends ResolversParentTypes['IntegerInnerObject'] = ResolversParentTypes['IntegerInnerObject']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  integer?: Resolver<Maybe<ResolversTypes['IntegerBool']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type IntegerObjectResolvers<ContextType = any, ParentType extends ResolversParentTypes['IntegerObject'] = ResolversParentTypes['IntegerObject']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  integer?: Resolver<Maybe<ResolversTypes['IntegerInnerObject']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  constants?: Resolver<ResolversTypes['ImmutableState'], ParentType, ContextType, RequireFields<MutationConstantsArgs, 'input'>>;
  current_epoch?: Resolver<ResolversTypes['String'], ParentType, ContextType, RequireFields<MutationCurrent_EpochArgs, 'input'>>;
  current_phase?: Resolver<ResolversTypes['PhaseState'], ParentType, ContextType, RequireFields<MutationCurrent_PhaseArgs, 'input'>>;
  finalized_epochs?: Resolver<ResolversTypes['String'], ParentType, ContextType, RequireFields<MutationFinalized_EpochsArgs, 'input'>>;
  initial_epoch?: Resolver<ResolversTypes['Int'], ParentType, ContextType, RequireFields<MutationInitial_EpochArgs, 'input'>>;
  output_state?: Resolver<ResolversTypes['String'], ParentType, ContextType, RequireFields<MutationOutput_StateArgs, 'input'>>;
};

export type OutputStateResolvers<ContextType = any, ParentType extends ResolversParentTypes['OutputState'] = ResolversParentTypes['OutputState']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  output_address?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  outputs?: Resolver<Maybe<ResolversTypes['IntegerObject']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  constants?: Resolver<Maybe<ResolversTypes['ImmutableState']>, ParentType, ContextType>;
  current_epoch?: Resolver<Maybe<ResolversTypes['AccumulatingEpoch']>, ParentType, ContextType>;
  current_phase?: Resolver<Maybe<ResolversTypes['PhaseState']>, ParentType, ContextType>;
  finalized_epochs?: Resolver<Maybe<ResolversTypes['FinalizedEpochs']>, ParentType, ContextType>;
  initial_epoch?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  output_state?: Resolver<Maybe<ResolversTypes['OutputState']>, ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  AccumulatingEpoch?: AccumulatingEpochResolvers<ContextType>;
  EpochInputState?: EpochInputStateResolvers<ContextType>;
  FinalizedEpoch?: FinalizedEpochResolvers<ContextType>;
  FinalizedEpochs?: FinalizedEpochsResolvers<ContextType>;
  ImmutableState?: ImmutableStateResolvers<ContextType>;
  IntegerBool?: IntegerBoolResolvers<ContextType>;
  IntegerInnerObject?: IntegerInnerObjectResolvers<ContextType>;
  IntegerObject?: IntegerObjectResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  OutputState?: OutputStateResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
};

