import { Participant, Track } from "twilio-video";
import Publication from "./Publication";
import UsePublications from "./UsePublications";

interface ParticipantTracksProps {
	participant: Participant;
	videoOnly?: boolean;
	enableScreenShare?: boolean;
	videoPriority?: Track.Priority | null;
	isLocalParticipant?: boolean;
}

export default function ParticipantTracks({
	participant,
	videoOnly,
	enableScreenShare,
	videoPriority,
	isLocalParticipant
}: ParticipantTracksProps) {
	
}