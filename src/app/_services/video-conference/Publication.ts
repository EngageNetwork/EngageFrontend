import { Track, LocalVideoTrack, RemoteVideoTrack, AudioTrack as IAudioTrack, LocalTrackPublication, Participant, RemoteTrackPublication } from 'twilio-video';
import { IVideoTrack } from './types';

import UseTrack from "./UseTrack";
import AudioTracks from './AudioTracks';
import VideoTrack from './VideoTrack';

interface PublicationProps {
	publication: LocalTrackPublication | RemoteTrackPublication;
	participant: Participant;
	isLocalParticipant?: boolean;
	videoOnly?: boolean;
	videoPriority?: Track.Priority | null;
}

export default function Publication({ publication, isLocalParticipant, videoOnly, videoPriority }: PublicationProps) {
	const track = UseTrack(publication);

	if (!track) {
		return null;
	}

	switch (track.kind) {
		case 'video':
			return ;
		case 'audio':
			return videoOnly ? null : AudioTracks(track as IAudioTrack);
		default:
			return null;
	}
}