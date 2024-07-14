const statInfoEl = document.getElementById('statInfo');
const statsCanvasEl = document.getElementById('statsCanvas');

/**
 * Display Cart
 * @param {*} workoutType 
 * @returns {void}
 * @description Function to display the workouts chart
 */
const displayChart = (workoutType) => {
    const workoutData = getWorkoutList();

    if (!workoutData.length) {
        statInfoEl.classList.remove(DISPLAY_NONE);
        statsCanvasEl.classList.add(DISPLAY_NONE);
        return;
    }

    statInfoEl.classList.add(DISPLAY_NONE);
    statsCanvasEl.classList.remove(DISPLAY_NONE);

    const ctx = document.getElementById('workoutChart').getContext('2d');
    const chartData = {
        labels: [],
        datasets: []
    };

    let chart = new Chart(ctx, {
        type: 'bar',
        data: chartData,
        options: {
            plugins: {
                title: {
                    display: true,
                    text: 'Workout Stats'
                },
            },
            interaction: {
                intersect: false,
            },
            responsive: true,
            maintainAspectRatio: false,
        }
    });

    const filteredData = workoutType === 'All' ? workoutData : workoutData.filter(workout => workout.type === workoutType);

    filteredData.forEach((workout) => {
        const createdAt = new Date(workout.createdAt);
        chartData.labels.push(`${workout.goal} ${workout.type}: ${createdAt.toLocaleDateString()}`);
    });

    const targetData = filteredData.map(workout => workout.goal);
    const actualData = filteredData.map(workout => workout.actual);

    chartData.datasets.push({
        label: 'Goal',
        type: 'line',
        backgroundColor: 'rgba(255, 255, 255, 1)',
        borderColor: 'rgb(0, 0, 0, 0.2)',
        data: targetData,
        borderWidth: 1,
        fill: false
    });

    chartData.datasets.push({
        label: 'Actual',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        data: actualData,
        borderWidth: 0,
    });

    chart.update();
};

displayChart('All');
