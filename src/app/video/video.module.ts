import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { VideoConferenceService } from '@app/_services';

import { VideoRoutingModule } from './video-routing.module';
import { BaseComponent } from './base/base.component';
import { MainParticipantComponent } from './main-participant/main-participant.component';
import { ParticipantListComponent } from './participant-list/participant-list.component';
import { ParticipantTracksComponent } from './participant-tracks/participant-tracks.component';
import { ParticipantComponent } from './participant/participant.component';
import { PublicationComponent } from './publication/publication.component';
import { AudioTrackComponent } from './audio-track/audio-track.component';
import { VideoTrackComponent } from './video-track/video-track.component';

@NgModule({
	declarations: [
		BaseComponent,
		MainParticipantComponent,
		ParticipantListComponent,
		ParticipantTracksComponent,
		ParticipantComponent,
		PublicationComponent,
		AudioTrackComponent,
		VideoTrackComponent
	],
	imports: [
		CommonModule,
		VideoRoutingModule,
		MatButtonModule,
		MatIconModule
	]
})

export class VideoModule { }
