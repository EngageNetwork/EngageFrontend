import { AudioTrack as IAudioTrack } from 'twilio-video';

export default function AudioTracks(track: IAudioTrack) {
	let audioEl: HTMLAudioElement;
	
	audioEl = track.attach();
	audioEl.setAttribute('data-cy-audio-track-name', track.name);
	document.body.appendChild(audioEl);
	
	// Implement proper cleanup
	// return () => track.detach().forEach(el => el.remove());
	
	
}