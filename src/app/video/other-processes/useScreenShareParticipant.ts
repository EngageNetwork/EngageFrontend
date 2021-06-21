import { Participant, TrackPublication } from "twilio-video";

export default function useScreenShareParticipant(videoConferenceService) {
	const room = videoConferenceService.room;
	let screenShareParticipant: Participant;
	
	//// Helper Methods
	const setScreenShareParticipant = (_screenShareParticipant: Participant) => {
		screenShareParticipant = _screenShareParticipant;
	}
	//// End of Helper Methods
	
	if (room) {
		const updateScreenShareParticipant = () => {
			setScreenShareParticipant(Array.from<Participant>(room.participants.values()).concat(room.isLocalParticipant).find((participant: Participant) => {
				Array.from<TrackPublication>(participant.tracks.values()).find(track => track.trackName.includes('screen'));
			}));
		};
		updateScreenShareParticipant();
		
		room.on('trackPublished', updateScreenShareParticipant);
		room.on('trackUnpublished', updateScreenShareParticipant);
		room.on('participantDisconnected', updateScreenShareParticipant);
		
		// Room object does not emit 'trackPublished' events for the localParticipant, so listen here for events
		room.localParticipant.on('trackPublished', updateScreenShareParticipant);
		room.localParticipant.on('trackUnpublished', updateScreenShareParticipant);
		
		// Handle cleanup
		// room.off('trackPublished', updateScreenShareParticipant);
		// room.off('trackUnpublished', updateScreenShareParticipant);
		// room.off('participantDisconnected', updateScreenShareParticipant);
		
		// room.localParticipant.off('trackPublished', updateScreenShareParticipant);
		// room.localParticipant.off('trackUnpublished', updateScreenShareParticipant);
	}

	return screenShareParticipant;
}