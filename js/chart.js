var ctx = document.getElementById('macroChart').getContext('2d');

var macroChart = new Chart(ctx, {
    type: 'pie',
    data: {
        labels: ['Fat', 'Carbohydrate', 'Protein', 'Fiber'],
        datasets: [{
            data: [
                food.fat || 0,
                food.carbohydrate || 0,
                food.protein || 0,
                food.fiber || 0
            ],
            backgroundColor: ['#e74c3c', '#e69d6c', '#1abc9c', '#9b59b6'],
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: {
                display: false
            }
        }
    }
});
