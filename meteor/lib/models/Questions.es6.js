
const SubjectProps = [ 'type', 'text', 'imageUrl', 'thumbnailUrl', 'url' ];

Subject = class Subject {

    constructor(props) {
        assignProps(this, SubjectProps, props);
    }

    getText() {
        return this.text;
    }

    getType() {
        return this.type;
    }

    getImageUrl() {
        return this.imageUrl;
    }
};


Subject.fromRaw = function(data) {
  return new Subject(data);
};

const ChoiceProps = [ 'text', 'imageUrl', 'fbId' ];

Choice = class Choice {

    constructor(props) {
        assignProps(this, ChoiceProps, props);
    }

    getText() {
        return this.text;
    }

    getImageUrl() {
        return this.imageUrl;
    }

    getFbId() {
        return this.fbId;
    }
};

Choice.fromRaw = function(data) {
    return new Choice({
        text: data.text || data.name,
        fbId: data.fb_id,
        imageUrl: data.image_url
    });
};

MultipleChoiceQuestionProps = [ '_id', 'subject', 'choices', 'answer', 'type', 'kind' ];

MultipleChoiceQuestion = class MultipleChoiceQuestion {

    constructor(props) {
        assignProps(this, MultipleChoiceQuestionProps, props);
    }

    getId() {
        return this._id;
    }

    getSubject() {
        return this.subject;
    }

    getType() {
        return this.type;
    }

    getKind() {
        return this.kind;
    }

    getChoices() {
        return this.choices;
    }

    getAnswer() {
        if (!Meteor.isServer) {
            throw new Error(`Well tried, there\'s nothing to see here. See for yourself: ${this.answer}`);
        }

        return this.answer;
    }
};

MultipleChoiceQuestion.fromRaw = function(data) {
    data.choices = _.map(data.choices, c =>
        Choice.fromRaw(c));

    data.subject = Subject.fromRaw(data.subject);

    return new MultipleChoiceQuestion(data);
};

TimelineQuestionProps = [ '_id', 'subject', 'minDate', 'maxDate', 'range', 'answer', 'type', 'kind' ];

TimelineQuestion = class TimelineQuestion {

    constructor(props) {
        assignProps(this, TimelineQuestionProps, props);
    }

    getId() {
        return this._id;
    }

    getType() {
        return this.type;
    }

    getKind() {
        return this.kind;
    }

    getSubject() {
        return this.subject;
    }

    getMinDate() {
        return this.minDate;
    }

    getMaxDate() {
        return this.maxDate;
    }

    getRange() {
        return this.range;
    }

    getAnswer() {
        if (!Meteor.isServer) {
            throw new Error(`Well tried, there\'s nothing to see here. See for yourself: ${this.answer}`);
        }

        return this.answer;
    }
};

TimelineQuestion.fromRaw = function(data){
    data.subject = Subject.fromRaw(data.subject);
    return new TimelineQuestion(data);
};


GeoQuestionProps = [ '_id', 'data', 'answer', 'type', 'kind' ];

GeoQuestion = class GeoQuestion {
    constructor(props) {
        assignProps(this, GeoQuestionProps, props);
    }

    getId() {
        return this._id;
    }

    getData() {
        return this.data;
    }

    getType() {
        return this.type;
    }

    getKind() {
        return this.kind;
    }

    getAnswer() {
        if (!Meteor.isServer) {
            throw new Error(`Well tried, there\'s nothing to see here. See for yourself: ${this.answer}`);
        }

        return this.answer;
    }
}

GeoQuestion.fromRaw = function(raw) {
  return new GeoQuestion(raw);
}

Question = {};

Question.Kind = {
    MultipleChoice: 'MultipleChoice',
    Timeline: 'Timeline',
    Geo: 'Geo'
};

Question.TypeMap = {};
Question.TypeMap[Question.Kind.MultipleChoice] = MultipleChoiceQuestion;
Question.TypeMap[Question.Kind.Timeline]       = TimelineQuestion;
Question.TypeMap[Question.Kind.Geo]            = GeoQuestion;

Question.fromRaw = (tile, data) => {
    const kind = Question.Kind[data.kind];
    if (kind == null) {
        throw new Meteor.Error(500, `Unknown question kind: ${data.kind}`);
    }

    const Constructor = Question.TypeMap[kind];
    if (Constructor == null) {
        throw new Meteor.Error(500, `Cannot find constructor for question of kind ${kind}`);
    }

    return Constructor.fromRaw(data);
};
