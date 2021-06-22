import { Room, TwilioError } from "twilio-video";

export default function HandleRoomDisconnection(
	videoRoomParam,
	removeLocalAudioTrack: () => void,
	removeLocalVideoTrack: () => void,
	isSharingScreenParam,
	toggleScreenShare: () => void
) {
	videoRoomParam.subscribe(videoRoomVar => {
		isSharingScreenParam.subscribe(isSharingScreenVar => {
			const videoRoom: Room | null = videoRoomVar;
			const isSharingScreen: boolean = isSharingScreenVar;

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
				
				// Handle cleanup
				// videoRoom.off('disconnected', onDisconnected);
			}
		});
	});
}