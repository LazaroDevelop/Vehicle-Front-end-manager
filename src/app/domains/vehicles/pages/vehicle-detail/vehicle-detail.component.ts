import {
  Component,
  computed,
  inject,
  Input,
  OnDestroy,
  signal,
  WritableSignal,
} from '@angular/core';
import {
  gasolineTypes,
  pumpTypes,
  Vehicle,
} from '../../../shared/models/vehicle.model';
import { VehicleService } from '../../../shared/services/vehicle.service';
import { CommonModule } from '@angular/common';
import { MultiSelectComponent } from '../../../shared/components/multi-select/multi-select.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ElectricalModel } from '../../../shared/models/registration.model';
import { batteryTypes } from '../../../shared/models/vehicle.model';

@Component({
  selector: 'vehicle-detail-ui',
  imports: [CommonModule, MultiSelectComponent, ReactiveFormsModule],
  templateUrl: './vehicle-detail.component.html',
  styleUrl: './vehicle-detail.component.css',
  standalone: true,
})
export default class VehicleDetailComponent {
  @Input() id?: string;
  vehicle = signal<Vehicle | null>(null);

  convertable = signal(false);
  editingMode = signal(false);

  gasolines = computed(() => gasolineTypes);
  batteryTypes = computed(() => batteryTypes);
  pumpTypes = computed(() => pumpTypes);
  private vehicleService = inject(VehicleService);
  private timeout: any[] = [];

  loading = signal(false);
  successMessage = signal('');
  errorMessage = signal('');

  $convertForm = new FormGroup({
    $fuelTypes: new FormControl([this.gasolines()[0]]),
  });

  $form = new FormGroup({
    $registration: new FormControl(this.vehicle()?.vehicleRegistration || ''),
    $vin: new FormControl(this.vehicle()?.vehicleIdentificationNumber || ''),
    $voltage: new FormControl(this.vehicle()?.voltage || 0),
    $current: new FormControl(this.vehicle()?.current || 0),
    $gasolineTypes: new FormControl(
      this.vehicle()?.gasolineType || [this.gasolines()[0]]
    ),
    $batteryTypes: new FormControl(
      this.vehicle()?.batteryType || [this.batteryTypes()[0]]
    ),
    $pumpTypes: new FormControl([
      this.vehicle()?.pumpType || this.pumpTypes()[0],
    ]),
  });

  ngOnInit() {
    this.getVehicleById();
  }

  getVehicleById() {
    if (this.id) {
      this.vehicleService.getVehicleById(this.id).subscribe({
        next: (data) => {
          this.vehicle.set(data);
        },
        error: (error) => {
          this.errorMessage.set(
            `Error fetching the specific vehicle ${error.error.message}`
          );
          this.setTemporaryMessage(this.errorMessage, 2000);
        },
      });
    }
  }

  onTriggerConvertable() {
    this.convertable.set(!this.convertable());
  }

  onTriggerEditMode() {
    this.editingMode.set(!this.editingMode());
    if (this.editingMode()) {
      this.$form.patchValue({
        $registration: this.vehicle()?.vehicleRegistration,
        $vin: this.vehicle()?.vehicleIdentificationNumber,
        $voltage: this.vehicle()?.voltage,
        $current: this.vehicle()?.current,
        $gasolineTypes: this.vehicle()?.gasolineType,
        $batteryTypes: this.vehicle()?.batteryType,
      });
    }
  }

  convertToGasoline(id?: number) {
    this.loading.set(true);
    if (id) {
      const { $gasolineTypes } = this.$form.getRawValue();

      if ($gasolineTypes) {
        this.vehicleService.convertVehicle(id, $gasolineTypes).subscribe({
          next: (data: ElectricalModel) => {
            if (data) {
              this.successMessage.set('Vehicle successfully converted');
              this.setTemporaryMessage(this.successMessage, 2000);
            }
          },
          error: (error) => {
            this.errorMessage.set(
              `There was an error during the convertions ${error.error.message}`
            );
            this.setTemporaryMessage(this.errorMessage, 2000);
          },
          complete: () => {
            this.loading.set(true);
          },
        });
      }
    }
  }

  updateVehicle() {
    this.loading.set(true);

    switch (this.vehicle()?.vehicleType) {
      case 'ELECTRICAL': {
        const { $registration, $vin, $batteryTypes, $current, $voltage } =
          this.$form.getRawValue();

        const id = this.vehicle()?.id;

        if (
          $registration &&
          $vin &&
          $batteryTypes &&
          $current &&
          $voltage &&
          id
        ) {
          this.vehicleService
            .updateVehicle(id, {
              _type: '_electrical',
              vehicleIdentificationNumber: $vin,
              vehicleRegistration: $registration,
              batteryType: $batteryTypes.toString(),
              vehicleType: 'ELECTRICAL',
              voltage: $voltage,
              current: $current,
            })
            .subscribe({
              next: (data) => {
                if (data) {
                  this.successMessage.set('Vehicle succesfully updated');
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
        const { $registration, $vin, $pumpTypes } = this.$form.getRawValue();

        const id = this.vehicle()?.id;

        if ($registration && $vin && $pumpTypes && id) {
          this.vehicleService
            .updateVehicle(id, {
              _type: '_diesel',
              vehicleIdentificationNumber: $vin,
              vehicleRegistration: $registration,
              pumpType: $pumpTypes.toString(),
              vehicleType: 'DIESEL',
            })
            .subscribe({
              next: (data) => {
                if (data) {
                  this.successMessage.set('Vehicle succesfully updated');
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
          const { $registration, $vin, $gasolineTypes } =
            this.$form.getRawValue();

          const id = this.vehicle()?.id;

          if ($registration && $vin && $gasolineTypes && id) {
            this.vehicleService
              .updateVehicle(id, {
                _type: '_gasoline',
                vehicleRegistration: $registration,
                vehicleIdentificationNumber: $vin,
                gasolineType: $gasolineTypes,
                vehicleType: 'GASOLINE',
              })
              .subscribe({
                next: (data) => {
                  if (data) {
                    this.successMessage.set('Vehicle succesfully updated');
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
    this.editingMode.set(false);
    this.getVehicleById();
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
