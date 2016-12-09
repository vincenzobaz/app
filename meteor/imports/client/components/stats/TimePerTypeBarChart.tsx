import {Stats} from "../../../common/models/Stats";
import {Kinds} from "../../../common/models/questions/common/Kind";
const Bar = require('react-chartjs-2').Bar;


export function TimePerTypeBarChart(props) {
   const stats: Stats[] = props.stats;

   let timePerType: {[key: string]: number} = {};
   Kinds.forEach(kind => timePerType[kind] = 0);

   for (let stat of stats) {
       for (let kind of Kinds) {
           timePerType[kind] += stat.counters[kind].timeSpent;
       }
   }

   let averages: number[] = Kinds.map(kind => timePerType[kind] / stats.length);

   let data = {
       labels: Kinds,
       datasets: [{
           label: 'Average time',
           data: averages,
           backgroundColor: 'rgba(255, 165, 0, 0.8)'
       }]
   };
   let options = {
       title: 'Average time spent per question type'
   };

   return (
       <Bar data={data} options={options}/>
   );
}
