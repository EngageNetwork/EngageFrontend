import { Room } from 'twilio-video';

export default function HandleTrackPublicationFailed(room: Room | null) {
    const handlePublicationFailure = () => {
        // Handle error
    }
    
    if (room) {
        room.localParticipant.on('trackPublicationFailed', handlePublicationFailure);
        return () => {
            room.localParticipant.off('trackPublicationFailed', handlePublicationFailure);
        };
    }
}