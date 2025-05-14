import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Page, VehicleRequest } from '../models/vehicle.model';
import {
  ElectricalModel,
  RegistrationModel,
} from '../models/registration.model';

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

  getVehiclesPaginated(category: string, page: Page, sort?: string[]) {
    if (category) {
      const url = new URL(`${this.apiUrl}/all/by-vehicles/paginated`);

      url.searchParams.append('type', category);
      url.searchParams.append('page', page.page.toString());
      url.searchParams.append('size', page.size.toString());

      if (sort) {
        url.searchParams.append('sort', sort.toString());
      }

      return this.http.get<any>(url.toString());
    } else {
      const url = new URL(`${this.apiUrl}/all/paginated`);

      url.searchParams.append('page', page.page.toString());
      url.searchParams.append('size', page.size.toString());

      if (sort) {
        url.searchParams.append('sort', sort.toString());
      }

      return this.http.get<any>(url.toString());
    }
  }

  getRegistrationReport() {
    return this.http.get<RegistrationModel>(`${this.apiUrl}/registration`);
  }

  getVehicleById(id: string) {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  storeVehicle(vehicle: VehicleRequest) {
    return this.http.post<any>(`${this.apiUrl}/create`, vehicle);
  }

  updateVehicle(id: number, vehicle: VehicleRequest) {
    return this.http.put(`${this.apiUrl}/update/${id}`, vehicle);
  }

  convertVehicle(id: number, fuelTypes: string[]) {
    const request = { fuelType: fuelTypes };

    return this.http.post<ElectricalModel>(
      `${this.apiUrl}/convert/${id}`,
      request
    );
  }

  dropVehicle(id: number) {
    return this.http.delete(`${this.apiUrl}/delete/${id}`);
  }
}
