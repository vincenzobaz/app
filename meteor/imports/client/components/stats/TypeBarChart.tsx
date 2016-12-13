import {Stats, Counter} from "../../../common/models/Stats";
import {Kinds} from "../../../common/models/questions/common/Kind";

const Bar = require("react-chartjs-2").Bar;
/**
 * Functional component for a barchart showing for each kind of
 * question the number of answered, answered correctly and answered incorrectly
 * questions
 * @param props with a stats property, an array of Stats objects
 */
export function TypeBarChart(props) {
    const stats: Stats[] = props.stats; // Retrieve data

    // Initizalize empty map of Kind -> Counter
    let totalCounters: {[key: string]: Counter} = {};
    Kinds.forEach(kind => totalCounters[kind] = new Counter(0, 0, 0, 0, 0));

    // Sum the counters object per question type
    for (let stat of stats) {
        for (let kind of Kinds) {
            totalCounters[kind].add(stat.counters[kind]);
        }
    }

    // Prepare graph
    let data = {
        labels: Kinds,
        datasets: [{
            label: 'Answered',
            data: Kinds.map(kind => totalCounters[kind].amount),
            backgroundColor: 'rgba(220, 220, 220, 0.8)',
        }, {
            label: 'Correct Answers',
            data: Kinds.map(kind => totalCounters[kind].correct),
            backgroundColor: 'rgba(0, 200, 0, 0.8)',
        }, {
            label: 'Wrong Answers',
            data: Kinds.map(kind => totalCounters[kind].wrong),
            backgroundColor: 'rgba(200, 0, 0, 0.8)',
        }/*, {
         label: 'avoid',
         data: Kinds.map(kind => totalCounters[kind].avoid),
         backgroundColor: backgroundColor
         }*/
        ]
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

    return (
        <Bar data={data} options={options}/>
    );
}
