//scoring logic for resume uplaoad 
function scoreResumeMatch(resumeText, keywords) {
  const resumeLower = resumeText.toLowerCase();
  const found = keywords.filter(word => resumeLower.includes(word));

  const percentMatch = (found.length / keywords.length) * 100;

  return {
    totalKeywords: keywords.length,
    matched: found.length,
    matchedKeywords: found,
    score: Math.round(percentMatch)
  };
}

module.exports = { scoreResumeMatch };
