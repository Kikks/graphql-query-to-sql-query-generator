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
  epoch_number: Scalars['String'];
  id: Scalars['ID'];
  input_contract_address: Scalars['String'];
  inputs: EpochInputState;
};

export type AccumulatingEpochInput = {
  descartesv2_contract_address: Scalars['String'];
  epoch_number: Scalars['String'];
  input_contract_address: Scalars['String'];
  inputs: EpochInputStateInput;
};

export type DescartesInput = {
  constants: Array<Maybe<ImmutableStateInput>>;
  current_epoch: AccumulatingEpochInput;
  current_phase: PhaseState;
  finalized_epochs: Array<Maybe<FinalizedEpochsInput>>;
  initial_epoch: Scalars['String'];
  output_state: OutputStateInput;
};

export type DescartesV2State = {
  __typename?: 'DescartesV2State';
  block_hash: Scalars['ID'];
  constants: Array<Maybe<ImmutableState>>;
  current_epoch: AccumulatingEpoch;
  current_phase: PhaseState;
  finalized_epochs: Array<Maybe<FinalizedEpochs>>;
  initial_epoch: Scalars['String'];
  output_state: OutputState;
};

export type EpochInputState = {
  __typename?: 'EpochInputState';
  epoch_number: Scalars['String'];
  id: Scalars['ID'];
  input_contract_address: Scalars['String'];
  inputs: Array<Maybe<Scalars['ID']>>;
};

export type EpochInputStateInput = {
  epoch_number: Scalars['String'];
  input_contract_address: Scalars['String'];
  inputs: Array<Maybe<InputData>>;
};

export type FinalizedEpoch = {
  __typename?: 'FinalizedEpoch';
  epoch_number: Scalars['String'];
  finalized_block_hash: Scalars['String'];
  finalized_block_number: Scalars['Int'];
  hash: Scalars['Int'];
  id: Scalars['ID'];
  inputs: EpochInputState;
};

export type FinalizedEpochInput = {
  epoch_number: Scalars['String'];
  finalized_block_hash: Scalars['String'];
  finalized_block_number: Scalars['Int'];
  hash: Scalars['Int'];
  inputs: EpochInputStateInput;
};

export type FinalizedEpochs = {
  __typename?: 'FinalizedEpochs';
  descartesv2_contract_address: Scalars['String'];
  finalized_epochs: Array<Maybe<FinalizedEpoch>>;
  id: Scalars['ID'];
  initial_epoch: Scalars['String'];
  input_contract_address: Scalars['String'];
};

export type FinalizedEpochsInput = {
  descartesv2_contract_address: Scalars['String'];
  finalized_epochs: Array<Maybe<FinalizedEpochInput>>;
  initial_epoch: Scalars['String'];
  input_contract_address: Scalars['String'];
};

export type ImmutableState = {
  __typename?: 'ImmutableState';
  challenge_period: Scalars['String'];
  contract_creation_timestamp: Scalars['String'];
  descartesv2_contract_address: Scalars['String'];
  dispute_contract_address: Scalars['String'];
  id: Scalars['ID'];
  input_contract_address: Scalars['String'];
  input_duration: Scalars['String'];
  output_contract_address: Scalars['String'];
  validator_contract_address: Scalars['String'];
};

export type ImmutableStateInput = {
  challenge_period: Scalars['String'];
  contract_creation_timestamp: Scalars['String'];
  descartesv2_contract_address: Scalars['String'];
  dispute_contract_address: Scalars['String'];
  input_contract_address: Scalars['String'];
  input_duration: Scalars['String'];
  output_contract_address: Scalars['String'];
  validator_contract_address: Scalars['String'];
};

export type Input = {
  __typename?: 'Input';
  id: Scalars['ID'];
  payload: Array<Maybe<Scalars['String']>>;
  sender: Scalars['String'];
  timestamp: Scalars['String'];
};

export type InputData = {
  payload: Array<Maybe<Scalars['String']>>;
  sender: Scalars['String'];
  timestamp: Scalars['String'];
};

export type IntegerBool = {
  __typename?: 'IntegerBool';
  integer: Scalars['Boolean'];
};

export type IntegerBoolInput = {
  integer: Scalars['Boolean'];
};

export type IntegerInnerObject = {
  __typename?: 'IntegerInnerObject';
  integer?: Maybe<IntegerBool>;
};

export type IntegerInnerObjectInput = {
  integer: IntegerBoolInput;
};

export type IntegerObject = {
  __typename?: 'IntegerObject';
  integer?: Maybe<IntegerInnerObject>;
};

export type IntegerObjectInput = {
  integer: IntegerInnerObjectInput;
};

export type Mutation = {
  __typename?: 'Mutation';
  DescartesState: DescartesV2State;
  constants: Array<Maybe<ImmutableState>>;
  current_epoch: AccumulatingEpoch;
  current_phase: PhaseState;
  finalized_epochs: Array<Maybe<FinalizedEpochs>>;
  initial_epoch: Scalars['String'];
  output_state: OutputState;
};


export type MutationDescartesStateArgs = {
  input: DescartesInput;
};


export type MutationConstantsArgs = {
  input: Array<Maybe<ImmutableStateInput>>;
};


export type MutationCurrent_EpochArgs = {
  input: AccumulatingEpochInput;
};


export type MutationCurrent_PhaseArgs = {
  input: PhaseState;
};


export type MutationFinalized_EpochsArgs = {
  input: Array<Maybe<FinalizedEpochsInput>>;
};


export type MutationInitial_EpochArgs = {
  input: Scalars['String'];
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
  outputs: IntegerObjectInput;
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
  DescartesState: Array<Maybe<DescartesV2State>>;
  constants: Array<Maybe<ImmutableState>>;
  current_epoch: Array<Maybe<AccumulatingEpoch>>;
  current_phase: Array<Maybe<PhaseState>>;
  finalized_epochs: Array<Maybe<FinalizedEpochs>>;
  initial_epoch: Scalars['String'];
  output_state: Array<Maybe<OutputState>>;
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
  DescartesInput: DescartesInput;
  DescartesV2State: ResolverTypeWrapper<DescartesV2State>;
  EpochInputState: ResolverTypeWrapper<EpochInputState>;
  EpochInputStateInput: EpochInputStateInput;
  FinalizedEpoch: ResolverTypeWrapper<FinalizedEpoch>;
  FinalizedEpochInput: FinalizedEpochInput;
  FinalizedEpochs: ResolverTypeWrapper<FinalizedEpochs>;
  FinalizedEpochsInput: FinalizedEpochsInput;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  ImmutableState: ResolverTypeWrapper<ImmutableState>;
  ImmutableStateInput: ImmutableStateInput;
  Input: ResolverTypeWrapper<Input>;
  InputData: InputData;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  IntegerBool: ResolverTypeWrapper<IntegerBool>;
  IntegerBoolInput: IntegerBoolInput;
  IntegerInnerObject: ResolverTypeWrapper<IntegerInnerObject>;
  IntegerInnerObjectInput: IntegerInnerObjectInput;
  IntegerObject: ResolverTypeWrapper<IntegerObject>;
  IntegerObjectInput: IntegerObjectInput;
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
  DescartesInput: DescartesInput;
  DescartesV2State: DescartesV2State;
  EpochInputState: EpochInputState;
  EpochInputStateInput: EpochInputStateInput;
  FinalizedEpoch: FinalizedEpoch;
  FinalizedEpochInput: FinalizedEpochInput;
  FinalizedEpochs: FinalizedEpochs;
  FinalizedEpochsInput: FinalizedEpochsInput;
  ID: Scalars['ID'];
  ImmutableState: ImmutableState;
  ImmutableStateInput: ImmutableStateInput;
  Input: Input;
  InputData: InputData;
  Int: Scalars['Int'];
  IntegerBool: IntegerBool;
  IntegerBoolInput: IntegerBoolInput;
  IntegerInnerObject: IntegerInnerObject;
  IntegerInnerObjectInput: IntegerInnerObjectInput;
  IntegerObject: IntegerObject;
  IntegerObjectInput: IntegerObjectInput;
  Mutation: {};
  OutputState: OutputState;
  OutputStateInput: OutputStateInput;
  Query: {};
  String: Scalars['String'];
};

export type AccumulatingEpochResolvers<ContextType = any, ParentType extends ResolversParentTypes['AccumulatingEpoch'] = ResolversParentTypes['AccumulatingEpoch']> = {
  descartesv2_contract_address?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  epoch_number?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  input_contract_address?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  inputs?: Resolver<ResolversTypes['EpochInputState'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DescartesV2StateResolvers<ContextType = any, ParentType extends ResolversParentTypes['DescartesV2State'] = ResolversParentTypes['DescartesV2State']> = {
  block_hash?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  constants?: Resolver<Array<Maybe<ResolversTypes['ImmutableState']>>, ParentType, ContextType>;
  current_epoch?: Resolver<ResolversTypes['AccumulatingEpoch'], ParentType, ContextType>;
  current_phase?: Resolver<ResolversTypes['PhaseState'], ParentType, ContextType>;
  finalized_epochs?: Resolver<Array<Maybe<ResolversTypes['FinalizedEpochs']>>, ParentType, ContextType>;
  initial_epoch?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  output_state?: Resolver<ResolversTypes['OutputState'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type EpochInputStateResolvers<ContextType = any, ParentType extends ResolversParentTypes['EpochInputState'] = ResolversParentTypes['EpochInputState']> = {
  epoch_number?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  input_contract_address?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  inputs?: Resolver<Array<Maybe<ResolversTypes['ID']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FinalizedEpochResolvers<ContextType = any, ParentType extends ResolversParentTypes['FinalizedEpoch'] = ResolversParentTypes['FinalizedEpoch']> = {
  epoch_number?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
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
  initial_epoch?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  input_contract_address?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ImmutableStateResolvers<ContextType = any, ParentType extends ResolversParentTypes['ImmutableState'] = ResolversParentTypes['ImmutableState']> = {
  challenge_period?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  contract_creation_timestamp?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  descartesv2_contract_address?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  dispute_contract_address?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  input_contract_address?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  input_duration?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  output_contract_address?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  validator_contract_address?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type InputResolvers<ContextType = any, ParentType extends ResolversParentTypes['Input'] = ResolversParentTypes['Input']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  payload?: Resolver<Array<Maybe<ResolversTypes['String']>>, ParentType, ContextType>;
  sender?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  timestamp?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type IntegerBoolResolvers<ContextType = any, ParentType extends ResolversParentTypes['IntegerBool'] = ResolversParentTypes['IntegerBool']> = {
  integer?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type IntegerInnerObjectResolvers<ContextType = any, ParentType extends ResolversParentTypes['IntegerInnerObject'] = ResolversParentTypes['IntegerInnerObject']> = {
  integer?: Resolver<Maybe<ResolversTypes['IntegerBool']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type IntegerObjectResolvers<ContextType = any, ParentType extends ResolversParentTypes['IntegerObject'] = ResolversParentTypes['IntegerObject']> = {
  integer?: Resolver<Maybe<ResolversTypes['IntegerInnerObject']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  DescartesState?: Resolver<ResolversTypes['DescartesV2State'], ParentType, ContextType, RequireFields<MutationDescartesStateArgs, 'input'>>;
  constants?: Resolver<Array<Maybe<ResolversTypes['ImmutableState']>>, ParentType, ContextType, RequireFields<MutationConstantsArgs, 'input'>>;
  current_epoch?: Resolver<ResolversTypes['AccumulatingEpoch'], ParentType, ContextType, RequireFields<MutationCurrent_EpochArgs, 'input'>>;
  current_phase?: Resolver<ResolversTypes['PhaseState'], ParentType, ContextType, RequireFields<MutationCurrent_PhaseArgs, 'input'>>;
  finalized_epochs?: Resolver<Array<Maybe<ResolversTypes['FinalizedEpochs']>>, ParentType, ContextType, RequireFields<MutationFinalized_EpochsArgs, 'input'>>;
  initial_epoch?: Resolver<ResolversTypes['String'], ParentType, ContextType, RequireFields<MutationInitial_EpochArgs, 'input'>>;
  output_state?: Resolver<ResolversTypes['OutputState'], ParentType, ContextType, RequireFields<MutationOutput_StateArgs, 'input'>>;
};

export type OutputStateResolvers<ContextType = any, ParentType extends ResolversParentTypes['OutputState'] = ResolversParentTypes['OutputState']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  output_address?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  outputs?: Resolver<Maybe<ResolversTypes['IntegerObject']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  DescartesState?: Resolver<Array<Maybe<ResolversTypes['DescartesV2State']>>, ParentType, ContextType>;
  constants?: Resolver<Array<Maybe<ResolversTypes['ImmutableState']>>, ParentType, ContextType>;
  current_epoch?: Resolver<Array<Maybe<ResolversTypes['AccumulatingEpoch']>>, ParentType, ContextType>;
  current_phase?: Resolver<Array<Maybe<ResolversTypes['PhaseState']>>, ParentType, ContextType>;
  finalized_epochs?: Resolver<Array<Maybe<ResolversTypes['FinalizedEpochs']>>, ParentType, ContextType>;
  initial_epoch?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  output_state?: Resolver<Array<Maybe<ResolversTypes['OutputState']>>, ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  AccumulatingEpoch?: AccumulatingEpochResolvers<ContextType>;
  DescartesV2State?: DescartesV2StateResolvers<ContextType>;
  EpochInputState?: EpochInputStateResolvers<ContextType>;
  FinalizedEpoch?: FinalizedEpochResolvers<ContextType>;
  FinalizedEpochs?: FinalizedEpochsResolvers<ContextType>;
  ImmutableState?: ImmutableStateResolvers<ContextType>;
  Input?: InputResolvers<ContextType>;
  IntegerBool?: IntegerBoolResolvers<ContextType>;
  IntegerInnerObject?: IntegerInnerObjectResolvers<ContextType>;
  IntegerObject?: IntegerObjectResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  OutputState?: OutputStateResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
};

