import { Component, inject, Input, signal } from '@angular/core';
import { Vehicle } from '../../../shared/models/vehicle.model';
import { VehicleService } from '../../../shared/services/vehicle.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'vehicle-detail-ui',
  imports: [CommonModule],
  templateUrl: './vehicle-detail.component.html',
  styleUrl: './vehicle-detail.component.css',
  standalone: true,
})
export default class VehicleDetailComponent {
  @Input() id?: string;
  vehicle = signal<Vehicle | null>(null);
  private vehicleService = inject(VehicleService);

  ngOnInit() {
    this.getVehicleById();
  }

  getVehicleById() {
    if (this.id) {
      console.log('Fetching vehicle details for ID:', this.id);
      this.vehicleService.getVehicleById(this.id).subscribe({
        next: (data) => {
          this.vehicle.set(data);
        },
        error: (error) => {
          console.error('Error fetching vehicle details:', error);
        },
      });
    }
  }
}
