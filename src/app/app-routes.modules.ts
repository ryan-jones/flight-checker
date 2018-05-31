import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';


const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: []
  },
  { path: '**', redirectTo: '/not-found' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class RoutingModule {}
