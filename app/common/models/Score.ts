export interface ScoreInterface {
    me: number;
    them: number;
}

export class Score implements ScoreInterface {
    constructor(public me: number, public them: number){
        this.me = me;
        this.them = them;
    }
}