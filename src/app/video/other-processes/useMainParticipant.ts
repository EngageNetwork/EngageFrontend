import useParticipants from "./useParticipants";
import useDominantSpeaker from "./useDominantSpeaker"
import useScreenShareParticipant from "./useScreenShareParticipant";

export default function useMainParticipant(videoConferenceService) {
	const room = videoConferenceService.room;
	const selectedParticipant = videoConferenceService.selectedParticipant;

	const participants = useParticipants(videoConferenceService);
	const dominantSpeaker = useDominantSpeaker(videoConferenceService);
	const screenShareParticipant = useScreenShareParticipant(videoConferenceService);

	const localParticipant = room?.localParticipant;
	const remoteScreenShareParticipant = screenShareParticipant !== localParticipant ? screenShareParticipant : null;

	return selectedParticipant || remoteScreenShareParticipant || dominantSpeaker || participants[0] || localParticipant;
}