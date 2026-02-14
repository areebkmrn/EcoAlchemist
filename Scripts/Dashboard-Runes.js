const waterInput = document.getElementById('water-input');
const electricityInput = document.getElementById('electricity-input');
const foodInput = document.getElementById('food-input');

const ecoBar = document.getElementById('eco-bar');
const ecoScoreText = document.getElementById('eco-score-text');

const waterRune = document.querySelector('.water.rune')
const windRune = document.querySelector('.wind.rune')
const foodRune = document.querySelector('.food.rune')

const waterTips = document.querySelector('.water.tips')
const windTips = document.querySelector('.wind.tips')
const earthTips = document.querySelector('.earth.tips')

const thresholds = {
  food: 30, //unit is grams
  water: 30, //litres
  electricity: 5 //kWh
}

const weeklyScores = []
const weeklyBars = Array.from({ length: 7 }, (_, i) => document.getElementById(`day-${i}`));

function updateWeeklyChart(score) {
  weeklyScores.push(score);

  if (weeklyScores.length > 7) weeklyScores.shift();

  weeklyBars.forEach((bar, index) => {
    const barScore = weeklyScores[index] || 0;
    bar.style.height = barScore + '%'

    if (barScore >= 70) bar.style.backgroundColor = '#4CAF50';
    else if (barScore >= 40) bar.style.backgroundColor = '#FFC107';
    else bar.style.backgroundColor = '#F44336';
  })
}

function calculateEcoScore(food, water, electricity) {
  const waterScore = Math.max(0, 100 - water / (5/10));
  const electricityScore = Math.max(0, 100 - electricity * 10);
  const foodScore = Math.max(0, 100 - food / (15/10));

  return Math.round((foodScore + waterScore + electricityScore) / 3);
}

function updateEcoBar(score) {
  ecoBar.style.height = score + '%';
  ecoScoreText.textContent = score;
}

function updateRunes(food, water, electricity) {
  if(food <= thresholds.food) foodRune.classList.add('unlocked');
  else foodRune.classList.remove('unlocked');

  if(water <= thresholds.water) waterRune.classList.add('unlocked');
  else waterRune.classList.remove('unlocked');

  if(electricity <= thresholds.electricity) windRune.classList.add('unlocked');
  else windRune.classList.remove('unlocked');
}

/* when button is clicked, the following will happen */
document.getElementById('calculate-btn').addEventListener('click', () => {
  const water = parseFloat(waterInput.value) || 0;
  const electricity = parseFloat(electricityInput.value) || 0;
  const food = parseFloat(foodInput.value) || 0;

  const ecoScore = calculateEcoScore(food, water, electricity);
  updateEcoBar(ecoScore);
  updateRunes(food, water, electricity);
  updateWeeklyChart(ecoScore)
});
