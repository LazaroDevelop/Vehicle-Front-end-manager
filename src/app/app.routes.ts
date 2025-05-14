import { Routes } from '@angular/router';
import { ListComponent } from './domains/vehicles/pages/list/list.component';
import LayoutComponent from './domains/shared/components/layout/layout.component';
import { NotFoundComponent } from './domains/info/pages/not-found/not-found.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
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
      {
        path: 'register',
        loadComponent: () =>
          import('./domains/vehicles/pages/register/register.component'),
      },
      {
        path: 'report',
        loadComponent: () =>
          import('./domains/vehicles/pages/report/report.component'),
      },
    ],
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
