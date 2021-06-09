import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LayoutComponent } from './layout/layout.component';
import { OverviewComponent } from './overview/overview.component';

const routes: Routes = [
	{
		path: '', component: LayoutComponent,
		children: [
			{ path: '', component: OverviewComponent },
			// {
			// 	path: 'sessions',
			// 	loadChildren: () => import ('./sessions/sessions.module').then(x => x.SessionsModule)
			// }
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class AboutRoutingModule { }
