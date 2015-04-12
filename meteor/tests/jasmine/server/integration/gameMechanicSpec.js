Jasmine.onTest(function () {
    "use strict";
    describe("GameMechanic", function() {
        var userId = "HruQZ4SC7uj7ScKX4";
        var otherUserId = "2134ABDD";
        var requestId;
        var gameId = "a5c85cd2-9cd8-4960-b359-8f53ad05b8bc";


        it("should return the amount of correct and wrong answered questions", function(done) {
            spyOn(Meteor, 'userId').and.returnValue(userId);
            spyOn(Games, 'find').and.returnValue(game1Mock);
            spyOn(GameBoards, 'find').and.returnValue(gameBoard1Mock);


            var tileId = gameBoard1Mock.tiles[0]._id;

            Meteor.call('Answer.post', gameId,tileId, [1, 3, 0] , function(error, result){
                expect(result).toBeDefined();
                expect(result.status).toBe("success");
                expect(result.data.correct).toBe(2);
                done();
            });
        });
    });
});
