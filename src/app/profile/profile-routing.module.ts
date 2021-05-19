import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutComponent } from './layout/layout.component';
import { OverviewComponent } from './overview/overview.component';
import { ViewProfileComponent } from './viewprofile/viewprofile.component';
import { UpdateComponent } from './update/update.component';
import { TutorApplicationComponent } from './tutor-application/tutor-application.component';
import { UpdateTranscriptComponent } from './update-transcript/update-transcript.component';

const routes: Routes = [
	{
		path: '', component: LayoutComponent,
		children: [
			{ path: '', component: OverviewComponent },
			{ path: 'viewprofile/:id', component: ViewProfileComponent },
			{ path: 'update', component: UpdateComponent },
			{ path: 'application', component: TutorApplicationComponent },
			{ path: 'update-transcript', component: UpdateTranscriptComponent }
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})

export class ProfileRoutingModule { }
