const badWords = ["kill", "suicide", "hate"];

export function isSensitive(text) {
  return badWords.some(word =>
    text.toLowerCase().includes(word)
  );
}