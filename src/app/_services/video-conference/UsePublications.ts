import { Participant, LocalTrackPublication, RemoteTrackPublication } from 'twilio-video';

type TrackPublication = LocalTrackPublication | RemoteTrackPublication;

export default function UsePublications(participant: Participant) {
	let publications: TrackPublication[] = [];
	
	//// Helper Methods
	const setPublications = (_publications: any) => {
		publications = _publications;
	}
	//// End of Helper Methods

	setPublications(Array.from(participant.tracks.values()) as TrackPublication[]);
	
	const publicationAdded = (publication: TrackPublication) => setPublications(prevPublications => [...prevPublications, publication]);

	const publicationRemoved = (publication: TrackPublication) => setPublications(prevPublications => prevPublications.filter(p => p !== publication));

	participant.on('trackPublished', publicationAdded);
	participant.on('trackUnpublished', publicationRemoved);
	
	// participant.off('trackPublished', publicationAdded);
	// participant.off('trackUnpublished', publicationRemoved);
	

	
	//// Return
	return publications;
}