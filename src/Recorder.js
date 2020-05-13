import React, {useState} from "react"
import {useMediaRecorder} from "./hooks/useMediaRecorder"
import "./Recorder.css"

export function Recorder() {

    const [mediaUrl, setMediaUrl] = useState(null)
    const record = useMediaRecorder()

    async function startRecord() {
        const blob = await record({
            duration: 1500
        })
        const mediaUrl = URL.createObjectURL(blob)
        const reader = new FileReader()

        reader.readAsDataURL(blob)
        reader.onloadend = function () {
            const base64data = reader.result
            console.log('base64', base64data)
        }

        setMediaUrl(mediaUrl)
    }

    return (
        <div className="Recorder">
            <button className="Recorder-button" onClick={startRecord}>Enregistrer</button>
            <video className="Recorder-video" src={mediaUrl} autoPlay={true} loop={true}/>
        </div>
    )
}
