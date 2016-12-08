
import {Stats} from "../../../common/models/Stats";
const LineChart = require('react-chartjs-2').Line;

export function PlayTimeLineChart(props) {
    const stats: Stats[] = props.data;
    let won: number[] = [];
    let played: number[] = [];
    let dates: string[] = [];

    stats.forEach(stat => {
        won.push(stat.win);
        played.push(stat.amount);
        dates.push(stat.date.toLocaleDateString())
    });

    let data = {
        labels: dates,
        datasets: [{
            data: won,
            label: 'Games won by date',
            backgroundColor: 'rgba(0, 200, 0, 0.5)'
        }, {
            data: played,
            label: 'Games played by date'
        }]
    };

    return (<LineChart data={data}/>);
}
