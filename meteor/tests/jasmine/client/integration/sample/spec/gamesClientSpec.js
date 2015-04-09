describe("Games", function() {
    var userId;
    var otherUserId = "2341ABDDG";
    beforeAll(function (done) {
        userId = Accounts.createUser({username: 'test-user', password:'pwd'});
        done();

    });

    afterAll(function (){
        Meteor.users.remove(userId);
    });

    it("should not be possible to save a game state from the client directly", function (done) {
        var game = new Game(null, Meteor.userId(), "kettle", null, null, "waiting", _.random(1,2), null, null);
        try {
            game.save({});
        } catch (ex){
            expect(ex).toBeDefined();
            done();
        }

    });

    it("should not be possible to insert a game state from the client directly", function (done) {
        var doc = {player1: Meteor.userId(), player2: otherUserId};
        //try {
            Games.insert(doc, function(error, result){
                expect(error).toBeDefined();
                expect(error.error).toBe(403);
                done();

            });

        //} catch (ex){
        //    expect(ex).toBeDefined();
        //    done();
        //}

    });

});
