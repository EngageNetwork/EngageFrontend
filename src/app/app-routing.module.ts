import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './_helpers';
import { Role } from './_models';

import { GlobalHomeComponent } from './global-home/global-home.component';

const routes: Routes = [
  // Temporary until real global home page setup
  { path: '', component: GlobalHomeComponent },
  {
    path: 'legal',
    loadChildren: () => import('./legal/legal.module').then(m => m.LegalModule),
  },
  {
    path: 'account',
    loadChildren: () => import('./account/account.module').then(m => m.AccountModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule),
    canActivate: [AuthGuard]
  },

  // Different Base Routes for Admin, Tutor, and Students
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] }
  },
  {
    path: 'tutor',
    loadChildren: () => import('./tutor/tutor.module').then(m => m.TutorModule),
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin, Role.Tutor] }
  },
  {
    path: 'student',
    loadChildren: () => import('./student/student.module').then(m => m.StudentModule),
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin, Role.Student] }
  },

  // If path doesn't fit any of the above, redirect user to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
