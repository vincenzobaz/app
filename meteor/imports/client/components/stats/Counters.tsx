import {Stats} from "../../../common/models/Stats";
export function Counters(props) {
    let stats: Stats[] = props.stats;

    let win: number = 0;
    let loss: number = 0;
    let tie: number = 0;

    stats.forEach(stat => {
        win += stat.win;
        loss += stat.loss;
        tie += stat.tie;
    });

    return (
        <h2>
        Win - Tie - Loss:&nbsp;
            <span style={{color: 'rgba(0, 200, 0, 0.8)'}}>
                {win}
            </span>
            -
            <span style={{color: 'rgba(255, 165, 0, 0.8)'}}>
                {tie}
            </span>
            -
            <span style={{color: 'rgba(200, 0, 0, 0.8)'}}>
                {loss}
            </span>
        </h2>
    );
}
