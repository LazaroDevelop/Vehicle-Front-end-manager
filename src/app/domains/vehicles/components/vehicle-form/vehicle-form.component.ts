import { CommonModule } from '@angular/common';
import { Component, inject, signal, WritableSignal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { categories } from '../../../shared/models/vehicle.model';
import { VehicleType } from '../../../shared/models/vehicle-type.type';
import {
  pumpTypes,
  batteryTypes,
  gasolineTypes,
} from '../../../shared/models/vehicle.model';
import { VehicleService } from '../../../shared/services/vehicle.service';
import { MultiSelectComponent } from '../../../shared/components/multi-select/multi-select.component';

@Component({
  selector: 'form-ui',
  imports: [CommonModule, ReactiveFormsModule, MultiSelectComponent],
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

  timeout: any[] = [];

  loading = signal(false);
  successMessage = signal('');
  errorMessage = signal('');

  private vehicleService = inject(VehicleService);

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
    gasolineType: new FormControl([this.gasolines()[0]]),
    bombType: new FormControl(this.pumpTypes()[0]),
  });

  onCategoryChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value as VehicleType;

    this.currentCategory.set(value);
  }

  onSubmit() {
    this.loading.set(true);
    switch (this.currentCategory()) {
      case 'ELECTRICAL': {
        const {
          registration,
          VIN,
          batteryType,
          batteryCurrent,
          batteryVoltage,
        } = this.form.getRawValue();

        if (
          registration &&
          VIN &&
          batteryType &&
          batteryCurrent &&
          batteryVoltage
        ) {
          this.vehicleService
            .storeVehicle({
              _type: '_electrical',
              vehicleIdentificationNumber: VIN,
              vehicleRegistration: registration,
              batteryType: batteryType,
              vehicleType: 'ELECTRICAL',
              voltage: batteryVoltage,
              current: batteryCurrent,
            })
            .subscribe({
              next: (data) => {
                if (data) {
                  this.successMessage.set('Vehicle succesfully saved');
                  this.setTemporaryMessage(this.successMessage, 2000);
                }
              },
              error: (error) => {
                this.errorMessage.set(
                  `There was an unexpected error => ${error.error.message}`
                );
                this.setTemporaryMessage(this.errorMessage, 2000);
              },
              complete: () => {
                this.loading.set(false);
              },
            });
        }
        break;
      }
      case 'DIESEL': {
        const { registration, VIN, bombType } = this.form.getRawValue();

        if (registration && VIN && bombType) {
          this.vehicleService
            .storeVehicle({
              _type: '_diesel',
              vehicleIdentificationNumber: VIN,
              vehicleRegistration: registration,
              pumpType: bombType,
              vehicleType: 'DIESEL',
            })
            .subscribe({
              next: (data) => {
                if (data) {
                  this.successMessage.set('Vehicle succesfully saved');
                  this.setTemporaryMessage(this.successMessage, 2000);
                }
              },
              error: (error) => {
                this.errorMessage.set(
                  `There was an unexpected error => ${error.error.message}`
                );
                this.setTemporaryMessage(this.errorMessage, 2000);
              },
              complete: () => {
                this.loading.set(false);
              },
            });
        }
        break;
      }
      case 'GASOLINE':
        {
          const { registration, VIN, gasolineType } = this.form.getRawValue();

          if (registration && VIN && gasolineType) {
            this.vehicleService
              .storeVehicle({
                _type: '_gasoline',
                vehicleRegistration: registration,
                vehicleIdentificationNumber: VIN,
                gasolineType: gasolineType,
                vehicleType: 'GASOLINE',
              })
              .subscribe({
                next: (data) => {
                  if (data) {
                    this.successMessage.set('Vehicle succesfully saved');
                    this.setTemporaryMessage(this.successMessage, 2000);
                  }
                },
                error: (error) => {
                  this.errorMessage.set(
                    `There was an unexpected error => ${error.error.message}`
                  );
                  this.setTemporaryMessage(this.errorMessage, 2000);
                },
                complete: () => {
                  this.loading.set(false);
                },
              });
          }
        }
        break;
    }
  }

  private setTemporaryMessage(
    messageSignal: WritableSignal<string>,
    timeout: number
  ) {
    const timeoutId = setInterval(() => messageSignal.set(''), timeout);
    this.timeout.push(timeoutId);
  }

  ngOnDestroy() {
    this.timeout.forEach(clearTimeout);
  }
}
