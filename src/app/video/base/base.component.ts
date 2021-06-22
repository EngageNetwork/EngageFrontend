import { Component, OnInit, AfterViewInit, ElementRef, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';

import { VideoConferenceService } from '@app/_services/videoconference.service';

@Component({
	templateUrl: './base.component.html',
	styleUrls: ['./base.component.scss']
})

export class BaseComponent implements OnInit, AfterViewInit {
	id: string;
	sessionDetails: any;
	authToken: string;

	documentBody: any;

	audioActive: boolean;
	videoActive: boolean;
	isSharingScreen: boolean;

	mainParticipant: string;

	constructor(
		@Inject(DOCUMENT) private document: Document,
		private route: ActivatedRoute,
		private router: Router,
		private snackBar: MatSnackBar,
		private videoConferenceService: VideoConferenceService,
		private title: Title
	) {	}
	
	ngOnInit() {
		this.documentBody = this.document.body;
		// this.documentBody.appendChild();

		this.videoConferenceService.initializeService();

		this.title.setTitle('Video Call');
		
		this.id = this.route.snapshot.params['id'];

		this.audioActive = true;
		this.videoActive = true;
		this.videoConferenceService.isSharingScreen.subscribe(value => this.isSharingScreen = value);
	}
	
	ngAfterViewInit() {

	}
	
	toggleAudio() {
		switch(this.audioActive) {
			case true:
				this.audioActive = false
				break
			case false:
				this.audioActive = true
				break
		}
	}

	toggleVideo() {
		switch(this.videoActive) {
			case true:
				this.videoActive = false
				break
			case false:
				this.videoActive = true
				break
		}
	}

	toggleScreenShare() {
		this.videoConferenceService.toggleScreenShare();
	}

	disconnectFromMeeting() {
		// this.videoConferenceService.disconnectRoom();
	}

	connectVideoConference() {
		// Call service to initiate room
		this.videoConferenceService.initiateRoom(this.id)
		.pipe(first())
		.subscribe(roomDetails => {
			// Generate auth token
			this.videoConferenceService.getToken(this.id)
			.pipe(first())
			.subscribe(authDetails => {
				this.authToken = authDetails.token;
				const options = { name: authDetails.sid, audio: true, video: true };

				// Call Connect through service
				// this.videoConferenceService.connectRoom(
				// 	this.authToken,
				// 	options,
				// 	// On participant connected
				// 	(participant) => {
				// 		console.log('Participant "%s" connected', participant.identity);

				// 		var div = this.remoteVideo;

				// 		// When user connected
				// 		participant.on('trackSubscribed', (track) => {
				// 			console.log(':: remoteVideoElement', this.remoteVideo);
				// 			this.remoteVideo.nativeElement.appendChild(track.attach());
				// 		});
				// 		// When user disconnected
				// 		participant.on('trackUnsubscribed', (track) => {
				// 			track.detach().forEach(element => element.remove());
				// 		});
				// 		// Check for present participants
				// 		console.log(':: checking present participants', participant.tracks);
				// 		participant.tracks.forEach(publication => {
				// 			if (publication.isSubscribed) {
				// 				this.remoteVideo.nativeElement.appendChild(publication.track.attach());
				// 			}
				// 		});
				// 	},
				// 	// On participant disconnected
				// 	(participant) => {
				// 		console.log('Participant "%s" disconnected', participant.identity);
				// 		this.remoteVideo.nativeElement.remove();
				// 	}
				// );
			}, error => {
				console.log('Error connecting video conference room', error);
			});
		});
	}
}
