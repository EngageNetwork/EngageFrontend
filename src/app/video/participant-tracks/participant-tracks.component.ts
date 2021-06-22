import { Component, Input, OnInit } from '@angular/core';
import { Participant, Track } from 'twilio-video';

@Component({
	selector: 'video-participant-tracks',
	templateUrl: './participant-tracks.component.html',
	styleUrls: ['./participant-tracks.component.scss']
})

export class ParticipantTracksComponent implements OnInit {
	@Input() participant: Participant;
	@Input() videoOnly?: boolean;
	@Input() enableScreenShare?: boolean;
	@Input() videoPriority?: Track.Priority | null;
	@Input() isLocalParticipant?: boolean;

	constructor() { }
	
	ngOnInit() {
		// console.log(this.participant, this.videoOnly, this.enableScreenShare, this.videoPriority, this.isLocalParticipant);
	}
	
}
