import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard, DevGuard } from './_helpers';
import { Role } from './_models';

import { GlobalHomeComponent } from './global-home/global-home.component';

const routes: Routes = [
	{ path: '', component: GlobalHomeComponent },
	{
		path: 'about',
		loadChildren: () => import('./about/about.module').then(m => m.AboutModule)
	},
	{
		path: 'newsroom',
		loadChildren: () => import('./newsroom/newsroom.module').then(m => m.NewsroomModule),
		canActivate: [DevGuard]
	},
	{
		path: 'legal',
		loadChildren: () => import('./legal/legal.module').then(m => m.LegalModule)
	},
	{
		path: 'account',
		loadChildren: () => import('./account/account.module').then(m => m.AccountModule)
	},

	// Auth required to activate all routes below
	{
		path: 'profile',
		loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule),
		canActivate: [AuthGuard]
	},
	{
		path: 'message',
		loadChildren: () => import('./message/message.module').then(m => m.MessageModule),
		canActivate: [AuthGuard]
	},
	{
		path: 'video',
		loadChildren: () => import('./video/video.module').then(m => m.VideoModule),
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
