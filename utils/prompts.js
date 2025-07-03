function generateCVPrompt(userInput) {
  return `Aşağıdaki bilgileri kullanarak profesyonel bir CV metni hazırla. İngilizce yaz.\n\nBilgiler: ${userInput}`;
}

function generateInterviewPrompt(userInput) {
  return `Aşağıdaki bilgilerle 3 özgün mülakat sorusu hazırla. Türkçe yaz.\n\nBilgiler: ${userInput}`;
}

module.exports = { generateCVPrompt, generateInterviewPrompt };
