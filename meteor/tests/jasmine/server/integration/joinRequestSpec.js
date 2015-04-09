Jasmine.onTest(function () {
    "use strict";
    describe("JoinRequest", function() {
        var userId = "123423AA";
        var otherUserId = "2134ABDD"
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
                var request = JoinRequests.findOne({_id: result.requestId});
                expect(request).toBeDefined();
                expect(request.from).toBe(userId);
                expect(request.to).toBe(otherUserId);
                expect(request.gameId).toBeDefined();
                var game = Games.findOne(request.gameId);
                expect(game).toBeDefined();
                expect(game.player1).toBe(userId);
                expect(game.player2).toBe(otherUserId);
                done();
            });
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

    });
});
