import { RemoteParticipant } from "twilio-video";

export default function useDominantSpeaker(videoConferenceService) {
	videoConferenceService.room.subscribe(room => {
		let dominantSpeaker: RemoteParticipant = (room?.dominantSpeaker ?? null);
		
		//// Helper Methods
		const setDominantSpeaker = (_dominantSpeaker) => {
			dominantSpeaker = _dominantSpeaker;
		}
		//// End of Helper Methods
		
		if (room) {
			const handleDominantSpeakerChanged = (newDominantSpeaker: RemoteParticipant) => {
				if (newDominantSpeaker !== null) {
					setDominantSpeaker(newDominantSpeaker);
				}
			};
			
			const handleParticipantDisconnected = (participant: RemoteParticipant) => {
				setDominantSpeaker(prevDominantSpeaker => {
					return prevDominantSpeaker === participant ? null : prevDominantSpeaker;
				});
			};
			
			room.on('dominantSpeakerChanged', handleDominantSpeakerChanged);
			room.on('participantDisconnected', handleParticipantDisconnected);
			
			// Handle cleanup
			// room.off('dominantSpeakerChanged', handleDominantSpeakerChanged);
			// room.off('participantDisconnected', handleParticipantDisconnected);
		}

		return dominantSpeaker;
	});
}