import { LocalVideoTrack, RemoteVideoTrack, Track } from 'twilio-video';
import { IVideoTrack } from './types';

import UseMediaStreamTrack from './UseMediaStreamTrack';
import UseVideoTrackDimensions from './UseVideoTrackDimensions';

interface VideoTrackProps {
	track: IVideoTrack;
	isLocal?: boolean;
	priority?: Track.Priority | null;
}

export default function VideoTrack({ track, isLocal, priority }: VideoTrackProps) {
	const vTracksElementRef: HTMLVideoElement = null!;
	const mediaStreamTrack = UseMediaStreamTrack(track);
	const dimensions = UseVideoTrackDimensions(track);
	const isPortrait = (dimensions?.height ?? 0) > (dimensions?.width ?? 0);
	
	const el = vTracksElementRef;
	el.muted = true;
	
	if (track.setPriority && priority) {
		track.setPriority(priority);
	}
	
	track.attach(el);
	
	// Handle cleanup
	// track.detach(el);
	// if (track.setPriority && priority) {
	// 	track.setPriority(null);
	// }
	
	

	//// Return
	return vTracksElementRef;
}