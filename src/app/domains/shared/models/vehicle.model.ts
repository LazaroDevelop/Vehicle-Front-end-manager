import { VehicleType } from './vehicle-type.type';
export interface Vehicle {
  id: string;
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
