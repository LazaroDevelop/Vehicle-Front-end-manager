import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Vehicle } from '../../../shared/models/vehicle.model';
import { CommonModule } from '@angular/common';
import { RouterLinkWithHref } from '@angular/router';

@Component({
  selector: 'vehicle-ui',
  imports: [CommonModule, RouterLinkWithHref],
  templateUrl: './vehicle.component.html',
  standalone: true,
  styleUrl: './vehicle.component.css',
})
export class VehicleComponent {
  @Input({ required: true }) vehicle!: Vehicle;
  @Output() drop = new EventEmitter<number>();

  dropVehicle(id: number) {
    this.drop.emit(id);
  }
}
