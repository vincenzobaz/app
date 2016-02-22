
const defaults = {
    Games: true,
    GameBoards: true,
    JoinRequests: true,
    GameFetches: true,
    Answers: true,
    Users: false,
    Friends: false
};

/* eslint curly:0 */
resetDB = (override = {}) => {
    const toDelete = _.extend({}, defaults, override);
    const collections = [];
    const all = override.All;

    if (all || toDelete.Games)         collections.push(Games);
    if (all || toDelete.JoinRequests)  collections.push(JoinRequests);
    if (all || toDelete.GameBoards)    collections.push(GameBoards);
    if (all || toDelete.GameFetches)   collections.push(GameFetches);
    if (all || toDelete.Answers)       collections.push(Answers);
    if (all || toDelete.Users)         collections.push(Meteor.users);
    if (all || toDelete.Friends)       collections.push(Friends);

    collections.forEach(coll => coll.remove({}));
};

