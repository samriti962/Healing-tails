const names = ["Calm", "Soul", "Hope", "Peace", "Light"];

export default function generateName() {
  const num = Math.floor(Math.random() * 1000);
  const name = names[Math.floor(Math.random() * names.length)];
  return `${name}_${num}`;
}