
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
    const toDelete = Object.assign({}, defaults, override);
    const collections = [];
    if (toDelete.Games)         collections.push(Games);
    if (toDelete.JoinRequests)  collections.push(JoinRequests);
    if (toDelete.GameBoards)    collections.push(GameBoards);
    if (toDelete.GameFetches)   collections.push(GameFetches);
    if (toDelete.Answers)       collections.push(Answers);
    if (toDelete.Users)         collections.push(Meteor.users);
    if (toDelete.Friends)       collections.push(Friends);

    collections.forEach(coll => coll.remove({}));
};

