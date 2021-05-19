import { ElementRef, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { connect, createLocalTracks, createLocalVideoTrack } from 'twilio-video';

import { environment } from '@environments/environment';

const baseUrl = `${environment.apiUrl}/slate/video`;

interface AuthDetails {
	sid: string,
	token: string;
}

@Injectable({ providedIn: 'root' })

export class VideoConferenceService {
	previewing: boolean;
	localVideo: ElementRef;
	remoteVideo: ElementRef;
	room: any;
	
	constructor(
		private http: HttpClient
	) { }
	
	initiateRoom(sessionId: string) {
		return this.http.post<any>(`${baseUrl}/initiate/${sessionId}`, null);
	}
	
	getToken(sessionId: string) {
		return this.http.get<AuthDetails>(`${baseUrl}/token/${sessionId}`);
	}

	connectRoom(authToken: string, options: any, onParticipantConnected, onParticipantDisconnected) {
		console.log(':: authToken', authToken);
		console.log(':: options', options);

		// Connect to room with specified token and options
		connect(authToken, options).then(room => {
			this.room = room;
			console.log(':: room', room);

			// Get video and audio from already connected participants
			room.participants.forEach((participant) => {
				onParticipantConnected(participant);
			});

			room.on('participantConnected', onParticipantConnected);
			room.on('participantDisconnected', onParticipantDisconnected);
			room.on('disconnected', error => room.participants.forEach(onParticipantDisconnected));
		})
	}

	disconnectRoom() {
		this.room.disconnect();
	}

	startLocalVideo(): void {
		createLocalVideoTrack().then(track => {
			console.log(':: local Track', track);
			if (!!this.localVideo) {
				this.localVideo.nativeElement.appendChild(track.attach());
			}
			else {
				console.error('Local video track does not exist')
			}
		});
	}

	// Handle room events
	participantConnected(participant) {
		console.log('Participant "%s" connected', participant.identify);
		const div = this.remoteVideo;

		participant.on('trackSubscribed', (track) => {
			// Attach track to remote div
			console.log(':: remoteVideoElement', this.remoteVideo);
			div.nativeElement.appendChild(track.attach());
		});
		participant.on('trackUnsubscribed', (track)=>{
			// Remove track from remote div
			track.detach().forEach(element => element.remove());
		});
		// Handling publications
		participant.tracks.forEach(publication => {
			if (publication.isSubscribed) {
				this.trackSubscribed(div, publication.track);
			}
		});
	}

	participantDisconnected(participant) {
		console.log('Participant "%s" disconnected', participant.identify);
		this.remoteVideo.nativeElement.remove();
	}

	trackSubscribed(div, track) {
		console.log(':: track Subscribed');
		div.appendChild(track.attach());
	}

	trackUnsubscribed(track) {
		console.log(':: track Unsubscribed');
		track.detach().forEach(element => element.remove());
	}
}
