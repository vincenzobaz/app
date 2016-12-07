import {Stats} from "../../common/models/Stats";
import {TypeBarChart} from "../components/stats/TypeBarChart";
import {decorate} from 'react-mixin';
import {Statistics} from "../collections/Statistics";
import {BackDashboardButton} from "../components/BackToDashBoardButton";

interface StatsProps {
    data: Stats[];
}

@decorate(ReactMeteorData)
export class StatsPage extends React.Component<StatsProps, {}> {
    private data;

    getMeteorData() {
        return {
            statsList: Statistics.find().fetch()
        };
    }

    render() {
        return (
            <div className="stats">
                <div className="charts">
                    <TypeBarChart stats={this.data.statsList} width={500} height={100}/>
                </div>
                <BackDashboardButton/>
           </div >
        );
    }
}

