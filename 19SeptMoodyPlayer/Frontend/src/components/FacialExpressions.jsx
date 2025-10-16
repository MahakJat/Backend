import React, { useEffect, useRef } from "react";
import * as faceapi from "face-api.js";
import "./FacialExpressions.css"
import axios from "axios"
function FacialExpressions({setSongs}) {
  const videoRef = useRef(null);
  const loadModels = async () => {
      const MODEL_URL = "/models"; // make sure models are in public/models
      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL), // optional but good
      ]);
      startVideo();
    };

    const startVideo = () => {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch((err) => console.error("Error accessing webcam:", err));
    };

    async function detectMood() {
      if (videoRef.current) {
        const detections = await faceapi
          .detectAllFaces(
            videoRef.current,
            new faceapi.TinyFaceDetectorOptions()
          )
          .withFaceLandmarks()
          .withFaceExpressions();

        let mostProbableExpression = 0;
        let _expression = "";

        for (const expression of Object.keys(detections[0].expressions)) {
          if (detections[0].expressions[expression] > mostProbableExpression) {
            mostProbableExpression = detections[0].expressions[expression];
            _expression = expression;
            console.log(_expression);

            // get http://localhost:3000/songs?mood=happy

           axios.get(`http://localhost:3000/songs?mood=${_expression}`).then((response)=>
             {
              console.log(response.data)
              setSongs(response.data.songs)
             }
          ).catch(err => console.log(err))
          }
        }
      }
    }

  useEffect(() => {
    loadModels();
  }, []);

  return (
   <div>
      <div style={{ position: "relative", width:"720px",
        height:"560px" }} >
      <video
        ref={videoRef}
        autoPlay
        muted
        style={{ borderRadius: "8px", position:"absolute", width:"720px",
        height:"560px" }}
        className="user-video-feed"
      />
    </div>
      <button onClick={detectMood}>detect mood</button>

   </div>
  );
}

export default FacialExpressions;
