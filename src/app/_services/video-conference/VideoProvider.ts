import HandleRoom from "./HandleRoom";
import HandleRoomDisconnection from "./HandleRoomDisconnection";
import HandleLocalTracks from "./HandleLocalTracks";
import HandleScreenShare from "./HandleScreenShare";

import { ConnectOptions, CreateLocalTrackOptions, LocalAudioTrack, LocalVideoTrack, Room } from "twilio-video";

export function VideoProvider(options: any) { // Change any type to ConnectOptions
	const {
		localTracks,
		getLocalAudioTrack,
		getLocalVideoTrack,
		isAcquiringLocalTracks,
		removeLocalAudioTrack,
		removeLocalVideoTrack,
		getAudioAndVideoTracks
	} = HandleLocalTracks();

	const { room, isConnecting, connect } = HandleRoom(localTracks, options);
	const [ isSharingScreen, toggleScreenShare ] = HandleScreenShare(room);

	HandleRoomDisconnection(
		room,
		removeLocalAudioTrack,
		removeLocalVideoTrack,
		isSharingScreen,
		toggleScreenShare
	);

	const context = {
		room,
		localTracks,
		isConnecting,
		getLocalVideoTrack,
		getLocalAudioTrack,
		connect,
		isAcquiringLocalTracks,
		removeLocalVideoTrack,
		isSharingScreen,
		toggleScreenShare,
		getAudioAndVideoTracks
	}
}