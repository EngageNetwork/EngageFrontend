import { ElementRef, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConnectOptions } from 'twilio-video';

import { environment } from '@environments/environment';

import ConnectionOptions from './video-conference/ConnectionOptions';
import HandleRoom from './video-conference/HandleRoom';
import HandleRoomDisconnection from './video-conference/HandleRoomDisconnection';
import HandleLocalTracks from './video-conference/HandleLocalTracks';
import HandleScreenShare from './video-conference/HandleScreenShare';
import HandleAudioDeviceDisconnect from './video-conference/HandleAudioDeviceDisconnect';
import HandleTrackPublicationFailed from './video-conference/HandleTrackPublicationFailed';
import UseSelectedParticipant from './video-conference/UseSelectedParticipant';

const baseUrl = `${environment.apiUrl}/slate/video`;

interface AuthDetails {
	sid: string,
	token: string;
}

@Injectable({ providedIn: 'root' })

export class VideoConferenceService {
	options: any;
	room: any;
	localTracks: any;
	isConnecting: any;
	getLocalVideoTrack: any;
	getLocalAudioTrack: any;
	connect: any;
	isAcquiringLocalTracks: any;
	removeLocalVideoTrack: any;
	removeLocalAudioTrack: any;
	isSharingScreen: any;
	toggleScreenShare: any;
	getAudioAndVideoTracks: any;
	selectedParticipant: any;
	setSelectedParticipant: any;
	
	constructor(
		private http: HttpClient
	) { }

	initializeService() {
		// Get connection options
		const connectionOptions = ConnectionOptions();
		this.options = connectionOptions;

		// HandleLocalTracks
		const {
			localTracks,
			getLocalVideoTrack,
			getLocalAudioTrack,
			isAcquiringLocalTracks,
			removeLocalAudioTrack,
			removeLocalVideoTrack,
			getAudioAndVideoTracks,
		} = HandleLocalTracks();

		this.localTracks = localTracks;
		this.getLocalVideoTrack = getLocalVideoTrack;
		this.getLocalAudioTrack = getLocalAudioTrack;
		this.isAcquiringLocalTracks = isAcquiringLocalTracks;
		this.removeLocalAudioTrack = removeLocalAudioTrack;
		this.removeLocalVideoTrack = removeLocalVideoTrack;
		this.getAudioAndVideoTracks = getAudioAndVideoTracks;
		
		// HandleRoom
		const { room, isConnecting, connect } = HandleRoom(this.localTracks, connectionOptions);

		this.room = room;
		this.isConnecting = isConnecting;
		this.connect = connect;

		// Handle Screen Share
		const [ isSharingScreen, toggleScreenShare ] = HandleScreenShare(room);
		
		this.isSharingScreen = isSharingScreen;
		this.toggleScreenShare = toggleScreenShare;

		// Register Handlers for Disconnect, Audio  Device Disconnect, and Failed Track Publication
		HandleRoomDisconnection(
			room,
			removeLocalAudioTrack,
			removeLocalVideoTrack,
			isSharingScreen,
			toggleScreenShare
		);

		HandleAudioDeviceDisconnect(localTracks);

		HandleTrackPublicationFailed(room);

		// SelectedParticipant Value and Setter
		const { selectedParticipant, setSelectedParticipant } = UseSelectedParticipant(room);
		this.selectedParticipant = selectedParticipant;
		this.setSelectedParticipant = setSelectedParticipant;
	}
	
	initiateRoom(sessionId: string) {
		return this.http.post<any>(`${baseUrl}/initiate/${sessionId}`, null);
	}
	
	getToken(sessionId: string) {
		return this.http.get<AuthDetails>(`${baseUrl}/token/${sessionId}`);
	}
}
