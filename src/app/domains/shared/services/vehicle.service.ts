import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { VehicleRequest } from '../models/vehicle.model';

@Injectable({
  providedIn: 'root',
})
export class VehicleService {
  private http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;

  constructor() {}

  getVehicles(category: string) {
    if (category) {
      const url = new URL(`${this.apiUrl}/all/by-vehicles`);

      url.searchParams.append('type', category);

      return this.http.get<any>(url.toString());
    } else {
      return this.http.get<any>(`${this.apiUrl}/all`);
    }
  }

  getVehicleById(id: string) {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  storeVehicle(vehicle: VehicleRequest) {
    return this.http.post<any>(`${this.apiUrl}/create`, vehicle);
  }

  dropVehicle(id: number) {
    return this.http.delete(`${this.apiUrl}/delete/${id}`);
  }
}
