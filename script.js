const OTHER_THRESHOLD = 1;

const list = [];


/* Find the population of all countries and fill list */
const allPopulation = data.reduce(function(prev, curr) { return prev + curr.population }, 0);

data.filter(function(value) {
    list.push({
        description: value.country,
        value: value.population,
        percentage: value.population * 100 / allPopulation
    });
});

/* Sort the list */
list.sort(function(a, b){
    return b.percentage - a.percentage
});

/* Add field 'Other' */
let percentageMiniCountry = 0,
    populationMiniCountry = 0,
    counter = 1;

list.sort(function(a, b) {
    if (a.percentage < OTHER_THRESHOLD && b.percentage < OTHER_THRESHOLD) {
        populationMiniCountry = populationMiniCountry + a.value + b.value;
        percentageMiniCountry = percentageMiniCountry + a.percentage + b.percentage;
        counter += 1;
    }
});

list.splice(-counter);

list.push({
    description: 'Other',
    value: populationMiniCountry,
    percentage: percentageMiniCountry
});

console.log(list);

// visualisation
const canvas = document.getElementById('canvas');
canvas.width = 750;
canvas.height = 500;

const ctx = canvas.getContext('2d');
const colors = CSS_COLOR_NAMES.slice(0);

let startAngle = 0;
list.forEach(({percentage, description}, index, list) => {
    // sector
    ctx.beginPath();
    ctx.fillStyle = colors.splice(Math.round(Math.random() * (colors.length - 1)), 1)[0];
    ctx.moveTo(250, 250);
    ctx.arc(250, 250, 200, startAngle, startAngle -= percentage * Math.PI / 50, true);
    ctx.lineTo(250, 250);
    ctx.fill();

    // legend
    const lHeight = 500 / list.length;
    ctx.fillRect(500, lHeight * index + (lHeight - 15) / 2, 15, 15);
    ctx.fillStyle = '#000';
    ctx.fillText(`${description} ( ${percentage.toFixed(2)}%)`, 520, lHeight * index + (lHeight - 15) / 2 + 10);
});
