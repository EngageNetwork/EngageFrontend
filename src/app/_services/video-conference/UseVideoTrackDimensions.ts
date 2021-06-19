import { LocalVideoTrack, RemoteVideoTrack } from "twilio-video";

type TrackType = LocalVideoTrack | RemoteVideoTrack;

export default function UseVideoTrackDimensions(track?: TrackType) {
    let dimensions = track?.dimensions;

    //// Helper Methods
    const setDimensions = (_dimensions) => {
        dimensions = _dimensions;
    }
    //// End of Helper Methods

    setDimensions(track?.dimensions);

    if (track) {
        const handleDimensionsChanged = (newTrack: TrackType) => {
            setDimensions({
                width: newTrack.dimensions.width,
                height: newTrack.dimensions.height
            });

            track.on('dimensionsChanged', handleDimensionsChanged);

            // Handle cleanup
            // track.off('dimensionsChanged', handleDimensionsChanged);
        }
    }



    //// Return
    return dimensions;
}