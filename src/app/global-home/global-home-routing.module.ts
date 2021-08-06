import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { DevGuard } from '../_helpers';

import { HomePageComponent } from './home-page/home-page.component';
import { AboutServiceComponent } from './about-service/about-service.component';

const routes: Routes = [
	{ path: '', component: HomePageComponent },
	{ path: 'how-it-works', component: AboutServiceComponent, canActivate: [DevGuard] }
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class GlobalHomeRoutingModule { }
