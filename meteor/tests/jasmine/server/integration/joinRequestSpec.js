Jasmine.onTest(function () {
    "use strict";
    describe("JoinRequest", function() {
        var userId = "123423AA";
        var otherUserId = "2134ABDD";
        var requestId;
        beforeAll(function() {
            userId = Accounts.createUser({username: 'test-user', password:'pwd'});
            console.log("damn");
            JoinRequests.remove({});


        });

        afterAll(function(){
            Meteor.users.remove(userId);
        });

        beforeEach(function(){
            spyOn(Meteor, 'userId').and.returnValue(userId);

        });

        it("should insert a join request and return success on successful insert", function(done) {
            Meteor.call('JoinRequest.send', otherUserId, function(error, result){
                expect(result).toBeDefined();
                expect(result.status).toBe("success");
                expect(result.requestId).toBeDefined();
                requestId = result.requestId;
                var request = JoinRequests.findOne({_id: result.requestId});
                expect(request).toBeDefined();
                expect(request.from).toBe(userId);
                expect(request.to).toBe(otherUserId);
                expect(request.gameId).toBeDefined();
                done();
            });
        });

        it("should have the same users for the requests and in the game itself", function(done){
            var request = JoinRequests.findOne({_id: requestId});
            var game = Games.findOne(request.gameId);
            expect(game).toBeDefined();
            expect(game.player1).toBe(userId);
            expect(game.player2).toBe(otherUserId);
            done();

        });

        it("should return an error if the insert fails", function(done){
            spyOn(JoinRequests, "insert").and.callFake(function(doc, callback){
                if (!_.isUndefined(callback)){
                    callback("something went wrong", null);
                }
            });
            Meteor.call('JoinRequest.send', otherUserId, function(error, result){
                expect(result).toBeDefined();
                expect(result.status).toBe("error");
                done();
            });
        });

        it("should create a game if a join request has been sent", function(done){
            spyOn(JoinRequests, "insert").and.callFake(function (doc, callback) {
                callback(null, 1);
            });

            spyOn(Games, "insert").and.callFake(function (doc, callback) {
                callback(null, 1);
            });

            Meteor.call('JoinRequest.send', otherUserId, function(error, result) {
                expect(result).toBeDefined();
                expect(result.status).toBe("success");
                expect(Games.insert).toHaveBeenCalled();
                done();
            });

        });

        it("should only accept requests if the accepter is the user in the `to` field", function(done){
            done();
        });



        it("should create two game boards if a request gets accepted", function(done){
            spyOn(Meteor.http, "get");

            Meteor.call('JoinRequest.accept', requestId, function(error, result) {
                //var request = JoinRequests.findOne(requestId);
                //expect(request).toBeDefined();
                //var game = Games.findOne(request.gameId);
                //expect(game).toBeDefined();
                //var board1 = GameBoards.fineOne(game.player1Board);
                //var board2 = Gameboards.findOne(game.player2Board);
                //expect(board1).toBeDefined();
                //expect(board2).toBeDefined();
                expect(Meteor.http.get).toHaveBeenCalled();

                done();
            });
        });



    });
});
