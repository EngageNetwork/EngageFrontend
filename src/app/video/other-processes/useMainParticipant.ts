import useDominantSpeaker from "./useDominantSpeaker"

export default function useMainParticipant(videoConferenceService) {
	const dominantSpeaker = useDominantSpeaker(videoConferenceService);

	return dominantSpeaker;
}