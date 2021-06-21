import { Participant, Room } from "twilio-video";

export default function UseSelectedParticipant(room: Room | null) {
	let selectedParticipant: Participant | null = null;
	
	//// Helper Methods
	const _setSelectedParticipant = (_selectedParticipant) => {
		selectedParticipant = _selectedParticipant;
	}
	const setSelectedParticipant = (participant: Participant) => {
		_setSelectedParticipant(prevParticipant => (prevParticipant === participant ? null : participant));
	}
	//// End of Helper Methods
	
	if (room) {
		const onDisconnect = () => _setSelectedParticipant(null);
		const handleParticipantDisconnected = (participant: Participant) => {
			_setSelectedParticipant(prevParticipant => (prevParticipant === participant ? null : prevParticipant));
		}
		
		room.on('disconnected', onDisconnect);
		room.on('participantDisconnected', handleParticipantDisconnected);
		// Handle Cleanup
		// room.off('disconnected', onDisconnect);
		// room.off('participantDisconnected', handleParticipantDisconnected);
	}

	return { selectedParticipant, setSelectedParticipant };
}