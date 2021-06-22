import { ElementRef, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
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
	room: BehaviorSubject<any> = new BehaviorSubject<any>(null);
	localTracks: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
	isConnecting: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
	isAcquiringLocalTracks: BehaviorSubject<any> = new BehaviorSubject<any>(null);
	isSharingScreen: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
	selectedParticipant: BehaviorSubject<any> = new BehaviorSubject<any>(null);

	getLocalVideoTrack: any;
	getLocalAudioTrack: any;
	connect: any;
	removeLocalVideoTrack: any;
	removeLocalAudioTrack: any;
	toggleScreenShare: any;
	getAudioAndVideoTracks: any;
	setSelectedParticipant: any;

	constructor(
		private http: HttpClient
	) {	}

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

		this.setLocalTracksVar(localTracks);
		this.setIsAcquiringLocalTracksVar(isAcquiringLocalTracks);

		this.getLocalVideoTrack = getLocalVideoTrack;
		this.getLocalAudioTrack = getLocalAudioTrack;
		this.removeLocalAudioTrack = removeLocalAudioTrack;
		this.removeLocalVideoTrack = removeLocalVideoTrack;
		this.getAudioAndVideoTracks = getAudioAndVideoTracks;
		
		// HandleRoom
		const { room, isConnecting, connect } = HandleRoom(this.localTracks, this.setRoomVar, this.setIsConnectingVar, connectionOptions);

		this.setRoomVar(room);
		this.setIsConnectingVar(isConnecting);

		this.connect = connect;

		// Handle Screen Share
		const [ isSharingScreen, toggleScreenShare ] = HandleScreenShare(this.room, this.setIsSharingScreenVar);

		this.setIsSharingScreenVar(isSharingScreen);
		this.toggleScreenShare = toggleScreenShare;

		// Register Handlers for Disconnect, Audio  Device Disconnect, and Failed Track Publication
		HandleRoomDisconnection(
			this.room,
			removeLocalAudioTrack,
			removeLocalVideoTrack,
			this.isSharingScreen,
			toggleScreenShare
		);

		HandleAudioDeviceDisconnect(this.localTracks);

		HandleTrackPublicationFailed(this.room);

		// SelectedParticipant Value and Setter
		const { selectedParticipant, setSelectedParticipant } = UseSelectedParticipant(room);

		this.setSelectedParticipantVar(selectedParticipant);

		this.setSelectedParticipant = setSelectedParticipant;
	}
	
	initiateRoom(sessionId: string) {
		return this.http.post<any>(`${baseUrl}/initiate/${sessionId}`, null);
	}
	
	getToken(sessionId: string) {
		return this.http.get<AuthDetails>(`${baseUrl}/token/${sessionId}`);
	}

	//// Var Setter Methods
	setRoomVar(value) {
		this.room.next(value);
	}
	setLocalTracksVar(value) {
		this.localTracks.next(value);
	}
	setIsConnectingVar(value: boolean) {
		this.isConnecting.next(value);
	}
	setIsAcquiringLocalTracksVar(value) {
		this.isAcquiringLocalTracks.next(value);
	}
	setIsSharingScreenVar(value: boolean) {
		this.isSharingScreen.next(value);
	}
	setSelectedParticipantVar(value) {
		this.selectedParticipant.next(value);
	}
}
