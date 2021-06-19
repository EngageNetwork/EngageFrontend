import { LocalTrackPublication, RemoteTrackPublication } from "twilio-video";

export default function UseTrack(publication: LocalTrackPublication | RemoteTrackPublication | undefined) {
	let track = publication && publication.track;
	
	//// Helper Methods
	const setTrack = (_track) => {
		track = _track;
	}
	//// End of Helper Methods
	
	setTrack(publication && publication.track);
	
	if (publication) {
		const removeTrack = () => setTrack(null);

		publication.on('subscribed', setTrack); // Possible issue
		publication.on('unsubscribed', removeTrack);

		// publication.off('subscribed', setTrack);
		// publication.off('unsubscribed', removeTrack);
	}

	return track;
}