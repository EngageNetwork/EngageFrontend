import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MichaelWangComponent } from './michael-wang/michael-wang.component';
import{ GerryChenComponent } from './gerry-chen/gerry-chen.component';

const routes: Routes = [
	{ path: 'michael-wang', component: MichaelWangComponent },
	{ path: 'gerry-chen', component: GerryChenComponent }
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class LeadershipRoutingModule { }
