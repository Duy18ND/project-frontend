var ctx = document.getElementById('macroChart').getContext('2d');

var macroChart = new Chart(ctx, {
    type: 'pie',
    data: {
        labels: ['Fat', 'Carbohydrate', 'Protein'],
        datasets: [{
            data: [38.3, 48.9, 12.8],
            backgroundColor: ['#e74c3c', '#e69d6c', '#1abc9c'],
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