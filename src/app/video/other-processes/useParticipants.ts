import { RemoteParticipant } from "twilio-video";
import useDominantSpeaker from "./useDominantSpeaker";

export default function useParticipants(videoConferenceService) {
	const room = videoConferenceService.room;
	const dominantSpeaker = useDominantSpeaker(videoConferenceService);
	let participants = Array.from(room?.participants.values() ?? []);
	
	//// Helper Methods
	const setParticipants = (_participants) => {
		participants = _participants;
	}
	//// End of Helper Methods
	
	if (dominantSpeaker) {
		setParticipants(prevParticipants => [
			dominantSpeaker,
			...prevParticipants.filter(participant => participant !== dominantSpeaker)
		]);
	}
	
	if (room) {
		const participantConnected = (participant: RemoteParticipant) => {
			setParticipants(prevParticipants => [...prevParticipants, participant]);
		}
		const participantDisconnected = (participant: RemoteParticipant) => {
			setParticipants(prevParticipants => prevParticipants.filter(p => p !== participant));
		}
		
		room.on('participantConnected', participantConnected);
		room.on('participantDisconnected', participantDisconnected);
		
		// Handle cleanup
		// room.off('participantConnected', participantConnected);
		// room.off('participantDisconnected', participantDisconnected);
	}

	return participants
}