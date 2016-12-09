
import {Stats} from "../../../common/models/Stats";
export function Counters(props) {
    let stats: Stats[] = props.stats;

    let win: number = 0;
    let loss: number = 0;

    stats.forEach(stat => {
        win += stat.win;
        loss += stat.loss;
    });

    return(<h2> Win - Loss : {win} - {loss}</h2>);
}
