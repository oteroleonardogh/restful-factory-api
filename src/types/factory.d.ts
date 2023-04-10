export type Factory = {
  id?: string;
  sprocketProductionActual: number;
  sprocketProductionGoal: number;
  time: number;
  createdAt?: Date;
  updatedAt?: Date;
};

export type FactorySearchCriteria = Partial<Factory>;
