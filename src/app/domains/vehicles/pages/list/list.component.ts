import { Component, inject, Input, signal, SimpleChanges } from '@angular/core';
import { Vehicle } from '../../../shared/models/vehicle.model';
import { CommonModule } from '@angular/common';
import { VehicleComponent } from '../../components/vehicle/vehicle.component';
import { VehicleService } from '../../../shared/services/vehicle.service';
import { RouterLinkWithHref } from '@angular/router';

@Component({
  selector: 'list-ui',
  imports: [CommonModule, VehicleComponent, RouterLinkWithHref],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
  standalone: true,
})
export class ListComponent {
  @Input() category!: string;
  vehicles = signal<Vehicle[]>([]);
  private vehicleSerivce = inject(VehicleService);
  categories: string[] = ['ELECTRICAL', 'GASOLINE', 'DIESEL'];

  ngOnInit() {
    this.getVehicles();
  }

  ngOnChanges(changes: SimpleChanges) {
    const category = changes['category'];
    if (category) {
      this.getVehicles();
    }
  }

  getVehicles() {
    this.vehicleSerivce.getVehicles(this.category).subscribe({
      next: (data) => {
        const allVehicles = [
          ...(data._embedded.electricalModelList || []),
          ...(data._embedded.gasolineModelList || []),
          ...(data._embedded.dieselModelList || []),
        ];
        this.vehicles.set(allVehicles);
      },
    });
  }
}
