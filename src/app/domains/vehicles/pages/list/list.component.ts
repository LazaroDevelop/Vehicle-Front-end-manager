import { Component, inject, Input, signal, SimpleChanges } from '@angular/core';
import {
  Page,
  Vehicle,
  categories,
} from '../../../shared/models/vehicle.model';
import { CommonModule } from '@angular/common';
import { VehicleComponent } from '../../components/vehicle/vehicle.component';
import { VehicleService } from '../../../shared/services/vehicle.service';
import { RouterLinkWithHref } from '@angular/router';
import { PaginatorComponent } from '../../../shared/components/paginator/paginator.component';

@Component({
  selector: 'list-ui',
  imports: [
    CommonModule,
    VehicleComponent,
    RouterLinkWithHref,
    PaginatorComponent,
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
  standalone: true,
})
export class ListComponent {
  @Input() category!: string;
  vehicles = signal<Vehicle[]>([]);
  private vehicleSerivce = inject(VehicleService);
  readonly categories = signal<string[]>(categories);

  currentPage: number = 0;
  pageSize: number = 5;
  totalRecords: number = 0;

  ngOnInit() {
    this.getVehicles();
  }

  onPageChange($event: Page) {
    this.currentPage = $event.page;
    this.pageSize = $event.size;
    this.getVehicles();
  }

  ngOnChanges(changes: SimpleChanges) {
    const category = changes['category'];
    if (category) {
      this.getVehicles();
    }
  }

  getVehicles() {
    const page: Page = { page: this.currentPage, size: this.pageSize };

    this.vehicleSerivce.getVehiclesPaginated(this.category, page).subscribe({
      next: (data) => {
        const allVehicles = [
          ...(data._embedded.electricalModelList || []),
          ...(data._embedded.gasolineModelList || []),
          ...(data._embedded.dieselModelList || []),
        ];
        this.vehicles.set(allVehicles);
        this.totalRecords = data.page.totalElements;
        console.log(this.totalRecords);
      },
    });
  }

  onDropVehicle(id: number) {
    this.vehicleSerivce.dropVehicle(id).subscribe({
      next: () => {
        window.alert('Vehicle was deleted successfully');
        this.getVehicles();
      },
      error: (error) => {
        window.alert(`Vehicle elimination failed => ${error.error.message}`);
      },
    });
  }
}
