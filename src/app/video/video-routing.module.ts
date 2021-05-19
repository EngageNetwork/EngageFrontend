import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BaseComponent } from './base/base.component';

const routes: Routes = [
	{ path: ':id', component: BaseComponent }
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})

export class VideoRoutingModule { }
