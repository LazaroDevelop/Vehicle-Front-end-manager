import { Routes } from '@angular/router';
import { ListComponent } from './domains/vehicles/pages/list/list.component';

export const routes: Routes = [
  {
    path: '',
    component: ListComponent,
  },
  {
    path: 'vehicle/:id',
    loadComponent: () =>
      import(
        './domains/vehicles/pages/vehicle-detail/vehicle-detail.component'
      ),
  },
];
