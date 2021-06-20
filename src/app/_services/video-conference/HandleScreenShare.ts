import { Track, Room, MediaStreamTrackPublishOptions } from "twilio-video"

export default function HandleScreenShare(videoRoom: Room | null) {
	let isSharing = false;
	
	let stopScreenShare = () => void(null!);
	
	const shareScreen = () => {
		// @ts-ignore
		navigator.mediaDevices.getDisplayMedia({
			audio: false,
			video: {
				frameRate: 30,
				height: 1080,
				width: 1920,
			}
		}).then(stream => {
			const track = stream.getTracks()[0];

			videoRoom!.localParticipant.publishTrack(track, {
				name: 'screen',
				priority: 'low'
			} as MediaStreamTrackPublishOptions).then(trackPublication => {
				stopScreenShare = () => {
					videoRoom!.localParticipant.unpublishTrack(track);
					// Remove if SDK is updated to emit event
					videoRoom!.localParticipant.emit('trackUnpublished', trackPublication);
					track.stop();
					setIsSharing(false);
				};

				track.onended = stopScreenShare;
				setIsSharing(true);
			}); // Catch error
		}); // Catch error
	}

	const toggleScreenShare = () => {
		if (videoRoom) {
			!isSharing ? shareScreen() : stopScreenShare();
		}
	}

	//// Helper Methods
	const setIsSharing = (_isSharing: boolean) => {
		isSharing = _isSharing;
	}



	//// Return
	return [ isSharing, toggleScreenShare ] as const;
}