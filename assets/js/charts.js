//added
//cardio strenght flexibility Custom
const workoutData = [
    { type: 'Cardio', target: 30, actual: 25 },
    { type: 'Cardio', target: 25, actual: 6 },
    { type: 'Cardio', target: 30, actual: 20 },
    { type: 'Custom', target: 5, actual: 4 },
    { type: 'Custom', target: 6, actual: 6 },
    { type: 'Custom', target: 7, actual: 20 },
    { type: 'Strength', target: 5, actual: 4 },
    { type: 'Strength', target: 6, actual: 6 },
    { type: 'Strength', target: 30, actual: 20 },
    { type: 'Flexibility', target: 10, actual: 8 },
    { type: 'Flexibility', target: 20, actual: 10 },
    { type: 'Flexibility', target: 12, actual: 15 }
];

const ctx = document.getElementById('myChart').getContext('2d');
const chartData = {
    labels: [],
    datasets: []
};

const colors = {
    Cardio: 'rgba(255, 99, 132, 0.2)',
    Strength: 'rgba(255, 99, 132, 0.2)',
    Flexibility: 'rgba(54, 162, 235, 0.2)',
    Custom: 'rgba(54, 162, 235, 0.2)'
};

const borderColor = {
    Cardio: 'rgba(255, 99, 132, 1)',
    Strength: 'rgba(255, 99, 132, 1)',
    Flexibility: 'rgba(54, 162, 235, 1)',
    Custom: 'rgba(54, 162, 235, 1)'
};

let myChart = new Chart(ctx, {
    type: 'bar',
    data: chartData,
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

const updateChart = (workoutType) => {
    chartData.labels = [];
    chartData.datasets = [];

    const filteredData = workoutType === 'All' ? workoutData : workoutData.filter(workout => workout.type === workoutType);

    filteredData.forEach((workout, index) => {
        chartData.labels.push(`Log ${index + 1}`);
    });

    const targetData = filteredData.map(workout => workout.target);
    const actualData = filteredData.map(workout => workout.actual);

    chartData.datasets.push({
        label: `${workoutType} - Target`,
        type: 'line',
        backgroundColor: colors[workoutType] || 'rgba(0, 0, 0, 0.1)',
        borderColor: borderColor[workoutType] || 'rgba(0, 0, 0, 1)',
        data: targetData,
        borderWidth: 2,
        fill: false
    });

    chartData.datasets.push({
        label: `${workoutType} - Actual`,
        backgroundColor: colors[workoutType] || 'rgba(0, 0, 0, 0.1)',
        borderColor: borderColor[workoutType] || 'rgba(0, 0, 0, 1)',
        data: actualData,
        borderWidth: 1
    });

    myChart.update();
};

document.getElementById('workoutFilter').addEventListener('change', (event) => {
    const selectedWorkout = event.target.value;
    updateChart(selectedWorkout);
});

document.getElementById('workoutForm').addEventListener('submit', (event) => {
    event.preventDefault();
    const workoutType = document.getElementById('workoutType').value;
    const target = parseInt(document.getElementById('target').value);
    const actual = parseInt(document.getElementById('actual').value);

    workoutData.push({ type: workoutType, target: target, actual: actual });
    updateChart(document.getElementById('workoutFilter').value);
    event.target.reset();
});

updateChart('All');
