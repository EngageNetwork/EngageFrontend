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
	videoRoom: any;
	
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
			this.videoRoom = room;
			console.log(':: room', room);

			// Get video and audio from already connected participants
			room.participants.forEach(onParticipantConnected);

			room.on('participantConnected', onParticipantConnected);
			room.on('participantDisconnected', onParticipantDisconnected);
			room.on('disconnected', (error) => room.participants.forEach(onParticipantDisconnected));
		})
	}

	disconnectRoom() {
		this.videoRoom.disconnect();
	}

	startLocalVideo() {
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

	trackSubscribed(track) {
		console.log('test');
		this.remoteVideo.nativeElement.appendChild(track.attach());
		return;
	}

	trackUnsubscribed(track) {
		track.detach().forEach(element => element.remove());
		return;
	}

	participantConnected(participant) {
		console.log('Participant "%s" connected', participant.identity);

		participant.on('trackSubscribed', track => this.trackSubscribed(track));
		participant.on('trackUnsubscribed', track => this.trackUnsubscribed(track));

		participant.tracks.forEach(publication => {
			if (publication.isSubscribed) {
				this.trackSubscribed(publication.track);
			}
		});
	}

	participantDisconnected(participant) {
		console.log('Participant "%s" disconnected', participant.identity);
		this.remoteVideo.nativeElement.remove();
	}













}
