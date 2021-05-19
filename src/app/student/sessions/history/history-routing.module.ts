import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OverviewComponent } from './overview/overview.component';
import { DetailsComponent } from './details/details.component';

const routes: Routes = [
	{ path: '', component: OverviewComponent },
	{ path: 'details/:id', component: DetailsComponent }
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class HistoryRoutingModule { }
