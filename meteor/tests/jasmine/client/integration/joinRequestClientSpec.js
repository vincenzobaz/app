describe("JoinRequest", function() {
    var userId;
    beforeAll(function () {
        userId = Accounts.createUser({username: 'test-user', password:'pwd'});
        console.log("damn")

    });

    afterAll(function (){
        Meteor.users.remove(userId);
    });

    it("should allow to login", function (done) {
        Meteor.loginWithPassword('test-user','pwd', function(error){
            expect(error).toBeUndefined();
            done();
        });

    });
});
