export function calculateStreak(moods) {
  let streak = 0;
  let today = new Date();

  for (let i = moods.length - 1; i >= 0; i--) {
    let d = new Date(moods[i].date);

    if ((today - d) / (1000 * 60 * 60 * 24) <= 1) {
      streak++;
      today = d;
    } else break;
  }

  return streak;
}