import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';

const routes: Routes = [
	{ path: '', children: [
		{ path: '', redirectTo: 'home', pathMatch: 'full' },
		{ path: 'home', component: HomeComponent },
		{
			path: 'listings',
			loadChildren: () => import('./listings/listings.module').then(m => m.ListingsModule)
		}
	]}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class TutorRoutingModule { }
