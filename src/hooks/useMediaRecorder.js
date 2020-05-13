import {RecordRTCPromisesHandler} from "recordrtc"

export function useMediaRecorder() {
    return async function ({ duration }) {
        let stream = await navigator.mediaDevices.getUserMedia({video: true, audio: true});
        let recorder = new RecordRTCPromisesHandler(stream, {
            type: 'video',
            mimeType: 'video/mp4'
        });
        recorder.startRecording();

        const sleep = m => new Promise(r => setTimeout(r, m));
        await sleep(duration);

        await recorder.stopRecording();
        return recorder.getBlob()
    }
}