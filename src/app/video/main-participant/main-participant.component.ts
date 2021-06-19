import { Component, OnInit } from '@angular/core';

import { VideoConferenceService } from '@app/_services';
import useMainParticipant from '../other-processes/useMainParticipant';

@Component({
	selector: 'video-main-participant',
	templateUrl: './main-participant.component.html',
	styleUrls: ['./main-participant.component.scss']
})

export class MainParticipantComponent implements OnInit {
	mainParticipant;

	constructor(
		private videoConferenceService: VideoConferenceService
	) { }
	
	ngOnInit() {
		this.mainParticipant = useMainParticipant(this.videoConferenceService);
	}
	
}
