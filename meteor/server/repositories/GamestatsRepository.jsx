GamestatRepository = {


    save(stat) {
        const doc = _.pick(stat, ...GamestatProps);
        if (stat._id) {
            Gamestats.update(stat._id, doc);
        } else {
            stat._id = Gamestats.insert(doc);
        }

        return stat._id;
    }

};
