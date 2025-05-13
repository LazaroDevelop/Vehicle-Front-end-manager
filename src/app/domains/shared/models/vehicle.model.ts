import { VehicleType } from './vehicle-type.type';
export interface Vehicle {
  id: number;
  vehicleRegistration: string;
  vehicleIdentificationNumber: string;
  pumpType?: string;
  batteryType?: string;
  voltage?: number;
  current?: number;
  reconverted?: boolean;
  gasolineType?: string[];
  _type: string;
  vehicleType: VehicleType;
}

export interface VehicleRequest {
  vehicleRegistration: string;
  vehicleIdentificationNumber: string;
  pumpType?: string;
  batteryType?: string;
  voltage?: number;
  current?: number;
  reconverted?: boolean;
  gasolineType?: string[];
  _type: string;
  vehicleType: VehicleType;
}

export interface Page {
  page: number;
  size: number;
}

export const categories: string[] = ['ELECTRICAL', 'GASOLINE', 'DIESEL'];
export const gasolineTypes: string[] = ['B83', 'B90', 'B98', 'B100'];
export const pumpTypes: string[] = ['LINEAL', 'ROTATION'];
export const batteryTypes: string[] = ['LITHIUM', 'GEL'];
