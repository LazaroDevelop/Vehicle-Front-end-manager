export interface RegistrationModel {
  electrical: ElectricalModel[];
  diesel: DieselModel[];
  gasoline: GasolineModel[];
}

export interface ElectricalModel {
  VIN: string;
  voltage: number;
  current: number;
  batteryType: string;
  reconverted: boolean;
  conversion_info: ConvertedInfo;
}

export interface ConvertedInfo {
  registration: string;
  fuelType: string[];
}

export interface DieselModel {
  registration: string;
  pumpType: string;
}

export interface GasolineModel {
  registration: string;
  fuelType: string[];
}
