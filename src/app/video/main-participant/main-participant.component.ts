import { Component, OnInit } from '@angular/core';
import { Room } from 'twilio-video';

import { VideoConferenceService } from '@app/_services';
import useMainParticipant from '../other-processes/useMainParticipant';
import useScreenShareParticipant from '../other-processes/useScreenShareParticipant';

@Component({
	selector: 'video-main-participant',
	templateUrl: './main-participant.component.html',
	styleUrls: ['./main-participant.component.scss']
})

export class MainParticipantComponent implements OnInit {
	room: Room | null;
	mainParticipant;
	localParticipant;
	selectedParticipant;
	screenShareParticipant;

	videoPriority;

	constructor(
		private videoConferenceService: VideoConferenceService
	) { }
	
	ngOnInit() {
		// this.videoConferenceService.isSharingScreen.subscribe(value => this.isSharingScreen = value);
		this.videoConferenceService.room.subscribe(value => this.room = value);
		this.videoConferenceService.selectedParticipant.subscribe(value => this.selectedParticipant = value);

		this.mainParticipant = useMainParticipant(this.videoConferenceService);
		this.localParticipant = this.room?.localParticipant;

		this.screenShareParticipant = useScreenShareParticipant(this.videoConferenceService);

		this.videoPriority = (this.mainParticipant === this.selectedParticipant || this.mainParticipant === this.screenShareParticipant) && this.mainParticipant !== this.localParticipant ? 'high' : null;
	}
}
