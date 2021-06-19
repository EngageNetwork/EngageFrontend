import { AudioTrack, VideoTrack } from "twilio-video";

export default function UseMediaStreamTrack(track?: AudioTrack | VideoTrack) {
    let mediaStreamTrack = track?.mediaStreamTrack;

    //// Helper Methods
    const setMediaStreamTrack = (_mediaStreamTrack) => {
        mediaStreamTrack = _mediaStreamTrack;
    }
    //// End of Helper Methods

    setMediaStreamTrack(track?.mediaStreamTrack);

    if (track) {
        const handleStarted = () => setMediaStreamTrack(track.mediaStreamTrack);

        track.on('started', handleStarted);
        
        // Handle cleanup
        // track.off('started', handleStarted);
    }



    //// Return
    return mediaStreamTrack;
}