import Video, { ConnectOptions, LocalTrack, Room } from 'twilio-video';

// @ts-ignore
window.TwilioVideo = Video;

export default function HandleRoom(localTracksParam, setRoomVar, setIsConnectingVar, options?: ConnectOptions) {
	let room: Room | null;
	let localTracks: LocalTrack[];
	let isConnecting = false;
	let optionsRef = options;
	
	//// Helper Methods
	localTracksParam.subscribe(value => this.localTracks = value);

	const setRoom = (_room: any) => {
		room = _room;
		setRoomVar(_room);
	}

	const setIsConnecting = (_isConnecting: boolean) => {
		isConnecting = _isConnecting;
		setIsConnectingVar(_isConnecting);
	}
	//// End of Helper Methods

	const connect = (token) => {
		setIsConnecting(true);
		return Video.connect(token, { ...optionsRef, tracks: localTracks}).then(
			connectedRoom => {
				setRoom(connectedRoom);
				
				const disconnect = () => connectedRoom.disconnect();
				
				connectedRoom.once('disconnected', () => {
					setTimeout(() => setRoom(null));
					window.removeEventListener('beforeunload', disconnect);

					// If isMobile
				});

				// @ts-ignore
				window.twilioRoom = connectedRoom;

				connectedRoom.localParticipant.videoTracks.forEach(publication => {
					publication.setPriority('low');
				});

				setIsConnecting(false);

				// Add listener to disconnect from room when page/browser is closed
				window.addEventListener('beforeunload', disconnect);

				// If isMobile
			}, error => {
				setIsConnecting(false);
			}
		)
	}



	//// Return
	return { room, isConnecting, connect };
}