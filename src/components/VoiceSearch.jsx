// src/components/VoiceSearch.jsx
import React from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

const VoiceSearch = ({ onSearch }) => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const handleStart = () => {
    resetTranscript();
    SpeechRecognition.startListening({ continuous: false });
  };

  const handleStop = () => {
    SpeechRecognition.stopListening();
    if (transcript.trim()) {
      onSearch(transcript.trim());
    }
  };

  if (!browserSupportsSpeechRecognition) {
    return <p>Your browser does not support voice search.</p>;
  }

  return (
    <div className="mb-6 text-center">
      <p className="text-gray-600 mb-2">Use your voice to search for products</p>
      <div className="flex justify-center gap-3">
        <button
          onClick={handleStart}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          🎙 Start
        </button>
        <button
          onClick={handleStop}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          ⏹ Stop
        </button>
      </div>
      {listening && (
        <p className="mt-2 text-sm text-blue-500">Listening... {transcript}</p>
      )}
    </div>
  );
};

export default VoiceSearch;
