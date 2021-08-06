import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HackathonComponent } from './hackathon/hackathon.component';

const routes: Routes = [
	{ path: 'hackathon', component: HackathonComponent }
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class EventsRoutingModule { }
