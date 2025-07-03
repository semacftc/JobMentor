async function generateCV() {
  const input = document.getElementById("userInput").value;
  const res = await fetch('/cv', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userInput: input })
  });
  const data = await res.json();
  document.getElementById("output").innerText = data.result;
}

async function generateInterview() {
  const input = document.getElementById("userInput").value;
  const res = await fetch('/interview', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userInput: input })
  });
  const data = await res.json();
  document.getElementById("output").innerText = data.questions;
}

let recognition;
function startRecording() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) return alert("Tarayıcınız desteklemiyor");

  recognition = new SpeechRecognition();
  recognition.lang = "tr-TR";
  recognition.start();

  recognition.onresult = async (event) => {
    const transcript = event.results[0][0].transcript;
    document.getElementById("voiceText").innerText = "Cevap: " + transcript;

    const res = await fetch("/evaluate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ answer: transcript })
    });
    const data = await res.json();
    document.getElementById("output").innerText = data.feedback;
  };
}

function downloadCV() {
  const content = document.getElementById("output").innerText;
  if (!content) return alert("Önce bir CV oluşturun");
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  const lines = doc.splitTextToSize(content, 180);
  doc.text(lines, 15, 20);
  doc.save("jobmentor-cv.pdf");
}
