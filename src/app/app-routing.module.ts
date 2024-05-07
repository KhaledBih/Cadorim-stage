import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { EmployeeEditComponent } from './components/employee-edit/employee-edit.component';
import { authGuard } from './guards/auth-guard.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'crud', component: EmployeeComponent, canActivate: [authGuard] },
  { path: 'edit/:id', component: EmployeeEditComponent },
  { path: 'add-employee', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
