import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { VehicleFormComponent } from '../../components/vehicle-form/vehicle-form.component';

@Component({
  selector: 'register-ui',
  imports: [CommonModule, VehicleFormComponent],
  standalone: true,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export default class RegisterComponent {}
