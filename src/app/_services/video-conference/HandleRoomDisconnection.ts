import { Room, TwilioError } from "twilio-video";

export default function HandleRoomDisconnection(
	videoRoom: Room | null,
	removeLocalAudioTrack: () => void,
	removeLocalVideoTrack: () => void,
	isSharingScreen: boolean,
	toggleScreenShare: () => void
	) {
		if (videoRoom) {
			const onDisconnected = (_: Room, error: TwilioError) => {
				if (error) {
					// Handle error
				}

				removeLocalAudioTrack();
				removeLocalVideoTrack();
				if (isSharingScreen) {
					toggleScreenShare();
				}
			};

			videoRoom.on('disconnected', onDisconnected);
			return () => {
				videoRoom.off('disconnected', onDisconnected);
			};
		}
	}