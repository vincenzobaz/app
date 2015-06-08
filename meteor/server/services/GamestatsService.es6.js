GamestatsService = {
    updateStatsGameWon(userId){
        const stat = GamestatsService.getStats(userId);
        stat.setGamesPlayed(stat.getGamesPlayed() + 1);
        stat.setGamesWon(stat.getGamesWon() + 1);
        GamestatRepository.save(stat);
    },

    updateStatsGameLost(userId) {
        const stat = GamestatsService.getStats(userId);
        stat.setGamesPlayed(stat.getGamesPlayed() + 1);
        stat.setGamesLost(stat.getGamesLost() + 1);
        GamestatRepository.save(stat);
    },

    updateStatsGameDraw(userId) {
        const stat = GamestatsService.getStats(userId);
        stat.setGamesPlayed(stat.getGamesPlayed() + 1);
        GamestatRepository.save(stat);
    },

    updateStatsForQuestions(questions, userId, results) {

        const questionsResults = _.zip(questions, results);
        const stat = GamestatsService.getStats(userId);

        _.forEach(questionsResults, qr => {
            switch (qr[0].getType()) {
                case QuestionTypes.MCWhichPageDidYouLike:
                    stat.setMCWhichPageDidYouLikeQuestionsTried(stat.getMCWhichPageDidYouLikeQuestionsTried() + 1);
                    stat.setMCTried(stat.getMCTried() + 1);
                    if (qr[1]) {
                        stat.setMCWhichPageDidYouLikeCorrect(stat.getMCWhichPageDidYouLikeCorrect() + 1);
                        stat.setMCCorrect(stat.getMCCorrect() + 1);
                    }
                    break;
                case QuestionTypes.MCWhoLikedYourPost:
                    stat.setMCWhoLikedYourPostQuestionsTried(stat.getMCWhoLikedYourPostQuestionsTried() + 1);
                    stat.setMCTried(stat.getMCTried() + 1);

                    if (qr[1]) {
                        stat.setMCWhoLikedYourPostCorrect(stat.getMCWhoLikedYourPostCorrect() + 1);
                        stat.setMCCorrect(stat.getMCCorrect() + 1);
                    }
                    break;
                case QuestionTypes.MCWhoMadeThisCommentOnYourPost:
                    stat.setMCWhoMadeThisCommentOnYourPostQuestionsTried(stat.getMCWhoMadeThisCommentOnYourPostQuestionsTried() + 1);
                    stat.setMCTried(stat.getMCTried() + 1);

                    if (qr[1]) {
                        stat.setMCWhoMadeThisCommentOnYourPostCorrect(stat.getMCWhoMadeThisCommentOnYourPostCorrect() + 1);
                        stat.setMCCorrect(stat.getMCCorrect() + 1);
                    }
                    break;
                case QuestionTypes.TLWhenDidYouShareThisPost:
                    stat.setTLWhenDidYouShareThisPostQuestionsTried(stat.getTLWhenDidYouShareThisPostQuestionsTried() + 1);
                    stat.setTLTried(stat.getTLTried() + 1);

                    if (qr[1]) {
                        stat.setTLWhenDidYouShareThisPostCorrect(stat.getTLWhenDidYouShareThisPostCorrect() + 1);
                        stat.setTLCorrect(stat.getTLCorrect() + 1);
                    }
                    break;
                case QuestionTypes.GeoWhatCoordinatesWereYouAt:
                    stat.setGeoWhatCoordinatesWereYouAtQuestionsTried(stat.getGeoWhatCoordinatesWereYouAtQuestionsTried() + 1);
                    stat.setGeoTried(stat.getGeoTried() + 1);

                    if (qr[1]) {
                        stat.setGeoWhatCoordinatesWereYouAtCorrect(stat.getGeoWhatCoordinatesWereYouAtCorrect() + 1);
                        stat.setGeoCorrect(stat.getGeoCorrect() + 1);
                    }
                    break;
                case QuestionTypes.ORDPostLikesNumber:
                    stat.setOrderTried(stat.getOrderTried() + 1);

                    if (qr[1]) {
                        stat.setOrderCorrect(stat.getGeoCorrect() + 1);
                    }
                    break;

                case QuestionTypes.ORDPageLike:
                    stat.setOrderTried(stat.getOrderTried() + 1);

                    if (qr[1]) {
                        stat.setOrderCorrect(stat.getGeoCorrect() + 1);
                    }
                    break;

                case QuestionTypes.ORDPageLikeTime:

                    break;

                case QuestionTypes.ORDPostCommentsNumber:
                    stat.setOrderTried(stat.getOrderTried() + 1);

                    if (qr[1]) {
                        stat.setOrderCorrect(stat.getGeoCorrect() + 1);
                    }
                    break;

                case QuestionTypes.ORDPostTime:
                    stat.setOrderTried(stat.getOrderTried() + 1);

                    if (qr[1]) {
                        stat.setOrderCorrect(stat.getGeoCorrect() + 1);
                    }
                    break;
                default:
                    Meteor.Error(500, `Unkown Question type for stats for user: ${userId}, type: ${question.getType()}`);
            }
            GamestatRepository.save(stat);
        });
    },

    getStats(userId) {
        var stat = Gamestats.findOne({userId: userId});
        if (!stat) {
            stat = new Gamestat({userId: userId});
        }
        return stat;
    }
};

