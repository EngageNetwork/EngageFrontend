import { LocalVideoTrack, RemoteVideoTrack, TwilioError } from 'twilio-video';

declare module 'twilio-video' {
	interface LocalVideoTrack {
		isSwitchedOff: undefined;
		setPriority: undefined;
	}
}

export type IVideoTrack = LocalVideoTrack | RemoteVideoTrack;