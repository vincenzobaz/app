import {Stats} from "../../common/models/Stats";
import {TypeBarChart} from "../components/stats/TypeBarChart";
import {decorate} from 'react-mixin';
import {Statistics} from "../collections/Statistics";
import {BackDashboardButton} from "../components/BackToDashBoardButton";
import {PlayTimeLineChart} from "../components/stats/PlayedTimeLine";
import {TimePerTypeBarChart} from "../components/stats/TimePerTypeBarChart";
import {Counters} from "../components/stats/Counters";

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
                    <h1>Statistics</h1><BackDashboardButton/>
                    <Counters stats={this.data.statsList}/>
                    <h2>What question types are you good at?</h2>
                    <TypeBarChart stats={this.data.statsList}/>
                    <TimePerTypeBarChart stats={this.data.statsList}/>
                    <h2>Are you improving over time?</h2>
                    <PlayTimeLineChart data={this.data.statsList}/>
                </div>
           </div >
        );
    }
}

