import Video, { ConnectOptions, LocalTrack, Room } from 'twilio-video';

// @ts-ignore
window.TwilioVideo = Video;

export default function HandleRoom(localTracks: LocalTrack[], options?: ConnectOptions) {
	let room: Room | null;
	let isConnecting = false;
	let optionsRef = options;
	
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

	//// Helper Methods
	// Emulate ReactJS hooks
	const setRoom = (_room: any) => {
		room = _room;
	}
	
	const setIsConnecting = (_isConnecting: boolean) => {
		isConnecting = _isConnecting;
	}



	//// Return
	return { room, isConnecting, connect };
}