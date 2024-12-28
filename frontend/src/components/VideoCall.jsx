import React, { useState, useRef, useEffect } from "react";
import ChatApp from "./ChatApp";

const VideoCall = () => {
  const [offerSDP, setOfferSDP] = useState("");
  const [answerSDP, setAnswerSDP] = useState("");
  const [isChatVisible, setChatVisible] = useState(false);

  const toggleChat = ()=>{
    setChatVisible(!isChatVisible);
  }

  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const peerConnectionRef = useRef(null);
  const localStreamRef = useRef(null);
  const remoteStreamRef = useRef(new MediaStream());

  useEffect(() => {
    const setupMedia = async () => {
      try {
        const localStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false,
        });

        localStreamRef.current = localStream;

        if (localVideoRef.current) {
          localVideoRef.current.srcObject = localStream;
        }

        peerConnectionRef.current = new RTCPeerConnection();
        localStream.getTracks().forEach((track) =>
          peerConnectionRef.current.addTrack(track, localStream)
        );

        peerConnectionRef.current.ontrack = (event) => {
          event.streams[0].getTracks().forEach((track) =>
            remoteStreamRef.current.addTrack(track)
          );
          if (remoteVideoRef.current) {
            remoteVideoRef.current.srcObject = remoteStreamRef.current;
          }
        };
      } catch (error) {
        console.error("Error setting up media:", error);
      }
    };

    setupMedia();

    return () => {
      if (localStreamRef.current) {
        localStreamRef.current.getTracks().forEach((track) => track.stop());
      }
      if (peerConnectionRef.current) {
        peerConnectionRef.current.close();
      }
    };
  }, []);

  const createOffer = async () => {
    const peerConnection = peerConnectionRef.current;
    if (!peerConnection) return;


    peerConnection.onicecandidate = (event) => {

      if (event.candidate) {
        setOfferSDP(JSON.stringify(peerConnection.localDescription));
      }
      navigator.clipboard.writeText(JSON.stringify(peerConnection.localDescription));

    };

    // // Add audio transceivers to receive audio from peer
    // peerConnection.addTransceiver('audio', { direction: 'recvonly' });


    const offer = await peerConnection.createOffer();

    // console.log(JSON.stringify(offer))
    await peerConnection.setLocalDescription(offer);

    alert("Offer created! SDP copied to clipboard");
  };

  const createAnswer = async () => {
    const peerConnection = peerConnectionRef.current;
    if (!peerConnection) return;

    const offer = JSON.parse(offerSDP);

    peerConnection.onicecandidate = (event) => {

      if (event.candidate) {
        setAnswerSDP(JSON.stringify(peerConnection.localDescription));
      }
      navigator.clipboard.writeText(JSON.stringify(peerConnection.localDescription));

    };


    await peerConnection.setRemoteDescription(offer);
    const answer = await peerConnection.createAnswer();

    await peerConnection.setLocalDescription(answer);
    alert("Answer created! SDP copied to clipboard");
  };

  const addAnswer = async () => {
    const peerConnection = peerConnectionRef.current;
    if (!peerConnection) return;

    const answer = JSON.parse(answerSDP);

    if (!peerConnection.currentRemoteDescription) {
      await peerConnection.setRemoteDescription(answer);
    }
  };

  return (
    <>

      <div className="bg-gray-900 min-h-screen">
        <div className="group">
          <button onClick={toggleChat}
            className="p-3 m-4 bg-blue-800 text-white transition rounded-full shadow-md focus:outline-none absolute right-0 hover:bg-blue-600"
          >
            ☰
          </button>
          <div className="absolute right-16 top-6 text-sm opacity-0 group-hover:opacity-100 transition duration-300 bg-gray-700 text-white px-4 py-2 rounded-lg shadow-md">
            Open Chat
          </div>
          {isChatVisible && <ChatApp toggleChat={toggleChat} />}
        </div>

        <div className="flex justify-center items-center gap-4 py-10">
          <video ref={localVideoRef} autoPlay playsInline muted width={600} className="rounded-lg" />
          <video ref={remoteVideoRef} autoPlay playsInline width={600} className="rounded-lg" />
        </div>
        <div className="flex justify-center items-center gap-3 p-6">
          <div className="flex justify-center gap-3 items-center">
            <button onClick={createOffer} className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-400 transition font-bold">Create Offer</button>
            <textarea
              value={offerSDP}
              onChange={(e) => setOfferSDP(e.target.value)}
              placeholder="Offer SDP"
              cols={50}
              className="border border-white rounded-md p-2 text-white bg-transparent"
            />
          </div>
          <div className="flex justify-center gap-3 items-center">
            <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-400 transition font-bold" onClick={createAnswer}>Create Answer</button>
            <textarea
              value={answerSDP}
              onChange={(e) => setAnswerSDP(e.target.value)}
              placeholder="Answer SDP"
              cols={50}
              className="border border-white rounded-md p-2 text-white bg-transparent"
            />
          </div>
        </div>

        <div className="flex justify-center items-center gap-6">
          <button onClick={addAnswer} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-400 transition font-bold">Add Answer</button>
          <button onClick={() => window.close()} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-400 transition font-bold">Disconnect</button>
        </div>

      </div>
    </>
  );
};

export default VideoCall;