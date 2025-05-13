import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import {
  categories,
  gasolineTypes,
} from '../../../shared/models/vehicle.model';
import { VehicleType } from '../../../shared/models/vehicle-type.type';
import { pumpTypes, batteryTypes } from '../../../shared/models/vehicle.model';

@Component({
  selector: 'form-ui',
  imports: [CommonModule, ReactiveFormsModule],
  standalone: true,
  templateUrl: './vehicle-form.component.html',
  styleUrl: './vehicle-form.component.css',
})
export class VehicleFormComponent {
  categories = signal<string[]>(categories);
  gasolines = signal<string[]>(gasolineTypes);
  pumpTypes = signal<string[]>(pumpTypes);
  batteryTypes = signal<string[]>(batteryTypes);
  currentCategory = signal<VehicleType>('ELECTRICAL');

  form = new FormGroup({
    registration: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(17),
    ]),
    VIN: new FormControl('', [
      Validators.required,
      Validators.minLength(7),
      Validators.maxLength(7),
    ]),
    batteryType: new FormControl(this.batteryTypes()[0], [Validators.required]),
    batteryCurrent: new FormControl(0),
    batteryVoltage: new FormControl(0),
    gasolineType: new FormControl(this.gasolines()[0]),
    bombType: new FormControl(this.pumpTypes()[0]),
  });

  onCategoryChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value as VehicleType;

    this.currentCategory.set(value);
  }

  onSubmit() {
    console.log(this.form.getRawValue());

    if (this.form.valid) {
      const value = this.form.getRawValue();

      console.log(value);
    }
  }
}
