import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';

import { VideoConferenceService } from '@app/_services/videoconference.service';



@Component({
	selector: 'app-base',
	templateUrl: './base.component.html',
	styleUrls: ['./base.component.scss']
})

export class BaseComponent implements OnInit, AfterViewInit {
	@ViewChild('localVideo') localVideo: ElementRef;
	@ViewChild('remoteVideo') remoteVideo: ElementRef;

	id: string;
	sessionDetails: any;
	authToken: string;

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private snackBar: MatSnackBar,
		private videoConferenceService: VideoConferenceService,
		private title: Title
	) { }
	
	ngOnInit() {
		this.title.setTitle('Video Call');
		
		this.id = this.route.snapshot.params['id'];

		// // Initiate Room
		// this.videoConferenceService.initiateRoom(this.id)
		// .pipe(first())
		// .subscribe(sessionDetails => {
		// 	// Generate Auth Token
		// 	this.videoConferenceService.getToken(this.id)
		// 	.pipe(first())
		// 	.subscribe(async authDetails => {
		// 		// Connect to room
		// 		const room = await connect(authDetails.token);

		// 		// Save LocalVideoTrack
		// 		let localVideoTrack = Array.from(room.localParticipant.videoTracks.values())[0].track;

		// 		// Handle LocalParticipant media
				
		// 	})
		// });
	}
	
	ngAfterViewInit() {
		this.videoConferenceService.localVideo = this.localVideo;
		this.videoConferenceService.remoteVideo = this.remoteVideo;
		console.log(':: localVideo updated', this.videoConferenceService.localVideo);
		console.log(':: remoteVideo updated', this.videoConferenceService.remoteVideo);

		this.connectVideoConference();
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
				const options = { name: authDetails.sid, audio: true };

				// Call Connect through service
				this.videoConferenceService.connectRoom(
					this.authToken,
					options,
					// On participant connected
					(participant) => {
						console.log('Participant "%s" connected', participant.identity);

						// When user connected
						participant.on('trackSubscribed', (track) => {
							console.log(':: remoteVideoElement', this.remoteVideo);
							this.remoteVideo.nativeElement.appendChild(track.attach());
						});
						// When user disconnected
						participant.on('trackUnsubscribed', (track) => {
							track.detach().forEach(element => element.remove());
						});
						// Check for present participants
						console.log(':: checking present participants', participant.tracks);
						participant.tracks.forEach(publication => {
							if (publication.isSubscribed) {
								this.remoteVideo.nativeElement.appendChild(publication.track.attach());
							}
						});
					},
					// On participant disconnected
					(participant) => {
						console.log('Participant "%s" disconnected', participant.identity);
						this.remoteVideo.nativeElement.remove();
					}
				);
			}, error => {
				console.log('Error connecting video conference room', error);
			});

			// Start local video view
			this.videoConferenceService.startLocalVideo();
		});
	}
}
