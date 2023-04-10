export type Sprocket = {
  id?: string;
  teeth: number;
  pitchDiameter: number;
  outsideDiameter: number;
  pitch: number;
  createdAt?: Date;
  updatedAt?: Date;
};

export type SprocketSearchCriteria = Partial<Sprocket>;
