import {Stats} from "../../../common/models/Stats";
const LineChart = require('react-chartjs-2').Line;

export function PlayTimeLineChart(props) {
    const stats: Stats[] = props.data;
    /*
     Chartjs does not provide a stacked area chart, therefore
     we have to simulate it using LineGraph with area under them.
     Therefore we compute the percentage of the value we want to display at the bottom and we add it
     to the value we want to display just above.
     */

    // Arrays containing added percentages.
    let won: number[] = [];
    let lost: number[] = [];
    let tie: number[] = [];

    stats.forEach((s, i) => {
        won.push((s.win * 100 / s.amount));
        lost.push((s.loss * 100 / s.amount) + won[i]);
        tie.push((s.tie * 100 / s.amount) + lost[i]);
    });

    let data = {
        labels: stats.map((s) => s.date.toLocaleDateString()),
        datasets: [{
            data: won,
            label: 'Games won by date (%)',
            backgroundColor: 'rgba(0, 200, 0, 1)'
        }, {
            data: lost,
            label: 'Games lost by date (%)',
            backgroundColor: 'rgba(200, 0, 0, 1)'
        }, {
            data: tie,
            label: 'Tie by date (%)',
            backgroundColor: 'rgba(255, 190, 0, 1)'
        }]
    };

    let options = {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    };

    return (<LineChart data={data} options={options}/>);
}
