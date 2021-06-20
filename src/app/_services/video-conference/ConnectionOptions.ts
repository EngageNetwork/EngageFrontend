import { ConnectOptions, Track, VideoBandwidthProfileOptions } from "twilio-video";

// Custom Interface
export interface Settings {
	maxAudioBitrate: string;

	// Below pairs are for settings that don't work in any p2p rooms (written in event of system upgrade)
	// trackSwitchOffMode: VideoBandwidthProfileOptions['trackSwitchOffMode'];
	// dominantSpeakerPriority?: Track.Priority;
	// bandwidthProfileMode: VideoBandwidthProfileOptions['mode'];
	// contentPreferencesMode?: 'auto' | 'manual';
	// clientTrackSwitchOffControl?: 'auto' | 'manual';
	// End of deactivated features
  }

export default function ConnectionOptions() {
	const settings: Settings = {
		maxAudioBitrate: '16000',
		// All the below settings don't work in any p2p rooms (written in event of system upgrade)
		// dominantSpeakerPriority: 'standard',
		// trackSwitchOffMode: undefined, 
		// bandwidthProfileMode: 'collaboration',
		// contentPreferencesMode: 'auto',
		// clientTrackSwitchOffControl: 'auto',
		// End of deactivated features
	}

	const connectionOptions: ConnectOptions = {
		maxAudioBitrate: Number(settings.maxAudioBitrate),

		// Below features are only available in Small Group or Group Rooms (Uncomment if ever activated)
		// bandwidthProfile: {
		// 	video: {
		// 		mode: settings.bandwidthProfileMode,
		// 		dominantSpeakerPriority: settings.dominantSpeakerPriority,
		// 		trackSwitchOffMode: settings.trackSwitchOffMode,
		// 		contentPreferencesMode: settings.contentPreferencesMode,
		// 		clientTrackSwitchOffControl: settings.clientTrackSwitchOffControl
		// 	}
		// },
		// dominantSpeaker: true,
		// networkQuality: { local: 1, remote: 1 },
		//
		// preferredVideoCodecs: [{ codec: 'VP8', simulcast: roomType !== 'peer-to-peer' && roomType !== 'go' }],
		// End of deactivated features
	}

	return connectionOptions;
}