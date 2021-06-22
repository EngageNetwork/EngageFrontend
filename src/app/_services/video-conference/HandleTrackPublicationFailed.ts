import { Room } from 'twilio-video';

export default function HandleTrackPublicationFailed(videoRoomParam) {
	let videoRoom: Room | null;
	
	videoRoomParam.subscribe(value => this.videoRoom = value);
	
	const handlePublicationFailure = () => {
		// Handle error
	}
	
	if (videoRoom) {
		videoRoom.localParticipant.on('trackPublicationFailed', handlePublicationFailure);

		// Handle cleanup
		// videoRoom.localParticipant.off('trackPublicationFailed', handlePublicationFailure);
	}
}