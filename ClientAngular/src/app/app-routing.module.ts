import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeComponent } from './employee/employee.component';
import { JobPositionComponent } from './job-position/job-position.component';
import { JobTitleComponent } from './job-title/job-title.component';

const routes: Routes = [
  {
    path: 'job-title',
    component: JobTitleComponent
  },
  {
    path: 'job-position',
    component: JobPositionComponent
  },
  {
    path: 'employee',
    component: EmployeeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }

