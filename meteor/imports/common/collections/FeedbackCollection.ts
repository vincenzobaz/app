import {Feedback} from "../models/Feedback";

export const FeedBackCollection = new Mongo.Collection<Feedback>("feedback");

FeedBackCollection.allow({
    insert: (userId: string | Mongo.ObjectID, doc: Feedback) => {
        //FIXME: We need to restrict the modifications to only admins and developers
        return true;
    },

    update: (userId: string | Mongo.ObjectID, doc: Feedback) => {
        //FIXME: We need to restrict the modifications to only admins and developers
        return true;
    }

});
