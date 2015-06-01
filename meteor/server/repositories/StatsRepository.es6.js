StatRepository = {


    save(stat) {
        const doc = _.pick(stat, ...StatProps);
        if (stat._id) {
            Stats.update(stat._id, doc);
        } else {
            stat._id = Stats.insert(doc);
        }

        return stat._id;
    }

};
