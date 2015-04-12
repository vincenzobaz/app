Jasmine.onTest(function () {
    "use strict";
    describe("GameBoards", function() {
        var userId = "123423AA";
        var otherUserId = "2134ABDD";

        it("should return a game board when fetchGameBoards is called", function(done){
            spyOn(Meteor, 'userId').and.returnValue(otherUserId);
            spyOn(Meteor.http, "get").and.callFake(function(url, callback){
                callback(null, {data: gameBoard1Mock});
            });

            Meteor.call('fetchGameBoard', userId, function(error, result) {
                expect(error).not.toBeDefined();
                expect(result).toBeDefined();
                expect(result.gameBoard).toBeDefined();
                var gameBoard = Server.fetchGameBoard(userId);
                expect(gameBoard.tiles).toBeDefined();
                done();
            });
        });

    });
});
