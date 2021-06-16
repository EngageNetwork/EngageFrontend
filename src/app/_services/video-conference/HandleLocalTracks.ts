import Video, { LocalVideoTrack, LocalAudioTrack, CreateLocalTrackOptions } from 'twilio-video';
import { DEFAULT_VIDEO_CONSTRAINTS, SELECTED_AUDIO_INPUT_KEY, SELECTED_AUDIO_OUTPUT_KEY, SELECTED_VIDEO_INPUT_KEY } from './vc-constants';

export default function HandleLocalTracks() {
	let audioTrack: LocalAudioTrack;
	let videoTrack: LocalVideoTrack;
	let isAcquiringLocalTracks: boolean;

	const localTracks = [audioTrack, videoTrack].filter(track => track !== undefined) as ( LocalAudioTrack | LocalVideoTrack )[];

	const getLocalAudioTrack = (deviceId: string) => {
		const options: CreateLocalTrackOptions = {};
		
		if (deviceId) {
			options.deviceId = { exact: deviceId };
		}
		
		return Video.createLocalAudioTrack(options).then(newTrack => {
			audioTrack = newTrack;
			return newTrack;
		});
	}
	
	const getLocalVideoTrack = async () => {
		const selectedVideoDeviceId = window.localStorage.getItem(SELECTED_VIDEO_INPUT_KEY);
		
		const { videoInputDevices } = await getDeviceInfo();
		
		const hasSelectedVideoDevice = videoInputDevices.some(
			device => selectedVideoDeviceId && device.deviceId === selectedVideoDeviceId
		)

		const options: CreateLocalTrackOptions = {
			...(DEFAULT_VIDEO_CONSTRAINTS as {}),
			name: `camera-${Date.now()}`,
			...(hasSelectedVideoDevice && { deviceId: { exact: selectedVideoDeviceId } })
		};

		return Video.createLocalVideoTrack(options).then(newTrack => {
			videoTrack = newTrack;
			return newTrack;
		})
	}

	const removeLocalAudioTrack = () => {
		if (audioTrack) {
			audioTrack.stop();
			audioTrack = undefined;
		}
	}

	const removeLocalVideoTrack = () => {
		if (videoTrack) {
			videoTrack.stop();
			videoTrack = undefined;
		}
	}

	const getAudioAndVideoTracks = async () => {
		const { audioInputDevices, videoInputDevices, hasAudioInputDevices, hasVideoInputDevices } = await getDeviceInfo();
		
		if (!hasAudioInputDevices && !hasVideoInputDevices) return Promise.resolve();
		if (isAcquiringLocalTracks || audioTrack || videoTrack) return Promise.resolve();

		isAcquiringLocalTracks = true;

		const selectedAudioDeviceId = window.localStorage.getItem(SELECTED_AUDIO_INPUT_KEY);
		const selectedVideoDeviceId = window.localStorage.getItem(SELECTED_VIDEO_INPUT_KEY);

		const hasSelectedAudioDevice = audioInputDevices.some(
			device => selectedAudioDeviceId && device.deviceId === selectedAudioDeviceId
		);
		const hasSelectedVideoDevice = videoInputDevices.some(
			device => selectedVideoDeviceId && device.deviceId === selectedVideoDeviceId
		);

		// Verify browser permissions (Specific to Chromium-based browsers)
		const isCameraPermissionDenied = await isPermissionDenied('camera');
		const isMicrophonePermissionDenied = await isPermissionDenied('microphone');

		const shouldAcquireVideo = hasVideoInputDevices && !isCameraPermissionDenied;
		const shouldAcquireAudio = hasAudioInputDevices && !isMicrophonePermissionDenied;

		const localTrackConstraints = {
			video: shouldAcquireVideo && {
				...(DEFAULT_VIDEO_CONSTRAINTS as {}),
				name: `camera-${Date.now()}`,
				...(hasSelectedVideoDevice && { deviceId: { exact: selectedVideoDeviceId! } })
			},
			audio: shouldAcquireAudio && (hasSelectedAudioDevice ? { deviceId: { exact: selectedAudioDeviceId! } } : hasAudioInputDevices)
		};

		return Video.createLocalTracks(localTrackConstraints).then(tracks => {
			const newVideoTrack = tracks.find(track => track.kind === 'video') as LocalVideoTrack;
			const newAudioTrack = tracks.find(track => track.kind === 'audio') as LocalAudioTrack;

			if (newVideoTrack) {
				videoTrack = newVideoTrack;

				window.localStorage.setItem(SELECTED_VIDEO_INPUT_KEY, newVideoTrack.mediaStreamTrack.getSettings().deviceId ?? '');
			}

			if (newAudioTrack) {
				audioTrack = newAudioTrack;
			}

			//// PUT ERROR HANDLING HERE WHEN IT EXISTS
			if (isCameraPermissionDenied && isMicrophonePermissionDenied) {
				// Put Handler Here
			}
			if (isCameraPermissionDenied) {
				// Put Handler Here
			}
			if (isMicrophonePermissionDenied) {
				// Put Handler Here
			}
		})
	}
	


	//// Helper Methods
	// Get Devices
	const getDeviceInfo = async () => {
		const devices = await navigator.mediaDevices.enumerateDevices();
		
		return {
			audioInputDevices: devices.filter(device => device.kind === 'audioinput'),
			videoInputDevices: devices.filter(device => device.kind === 'videoinput'),
			audioOutputDevices: devices.filter(device => device.kind === 'audiooutput'),
			hasAudioInputDevices: devices.some(device => device.kind === 'audioinput'),
			hasVideoInputDevices: devices.some(device => device.kind === 'videoinput'),
		}
	}

	// Method returns true when specific permission is denied. If API doesn't exist or query method returns error, false is returned.
	const isPermissionDenied = async (name: PermissionName) => {
		if (navigator.permissions) {
			try {
				const result = await navigator.permissions.query({ name });
				return result.state === 'denied';
			} catch {
				return false;
			}
		}
		else {
			return false;
		}
	}



	//// Return all functions
	return {
		localTracks,
		getLocalAudioTrack,
		getLocalVideoTrack,
		isAcquiringLocalTracks,
		removeLocalAudioTrack,
		removeLocalVideoTrack,
		getAudioAndVideoTracks
	}
}