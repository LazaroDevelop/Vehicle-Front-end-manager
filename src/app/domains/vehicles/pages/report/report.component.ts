import { CommonModule } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { VehicleService } from '../../../shared/services/vehicle.service';
import { RegistrationModel } from '../../../shared/models/registration.model';
import { categories } from '../../../shared/models/vehicle.model';

@Component({
  selector: 'app-report',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './report.component.html',
  styleUrl: './report.component.css',
})
export default class ReportComponent {
  currentCategory = signal<string>(categories[0]);

  elabels = signal([
    'Vehicle Identification Number',
    'Battery Type',
    'Battery Voltage',
    'Battery Current',
    'Reconverted',
    'Vehicle registration',
    'Fuel types',
  ]);

  dlabels = signal(['Vehicle registration', 'Pump type']);
  glabels = signal(['Vehicle registration', 'Fuel types']);

  result = signal<RegistrationModel>({
    diesel: [],
    electrical: [],
    gasoline: [],
  });

  diesel = computed(() => {
    const { diesel } = this.result();
    return diesel;
  });

  electrical = computed(() => {
    const { electrical } = this.result();
    return electrical;
  });

  gasoline = computed(() => {
    const { gasoline } = this.result();
    return gasoline;
  });

  private vehicleService = inject(VehicleService);

  ngOnInit() {
    this.getRegistrationReport();
  }

  getRegistrationReport() {
    this.vehicleService.getRegistrationReport().subscribe({
      next: (data: RegistrationModel) => {
        this.result.set(data);
      },
    });
  }

  setCategory(category: string) {
    this.currentCategory.set(category);
  }
}
