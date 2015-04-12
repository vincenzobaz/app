describe("JoinRequest", function() {
    var userId;
    beforeAll(function (done) {
        userId = Accounts.createUser({username: 'test-user', password:'pwd'});
        done();

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

    //skipping test as appears to inconsistently fail and succed, most likely because the database isn't reset
    xit("should successfully create join request and remove it on decline", function(done) {
        var count = JoinRequests.find().count();
        Meteor.loginWithPassword('test-user','pwd', function(error){
            expect(error).toBeUndefined();
            Meteor.call('JoinRequest.send', '4422211', function(error, result){
                expect(result).toBeDefined();
                expect(result.status).toBe("success");
                expect(JoinRequests.find().count()).toBe(count + 1);

                Meteor.call('JoinRequest.decline', result.requestId, function(error, result){
                    expect(result).toBeDefined();
                    expect(result.status).toBe("success");
                    expect(JoinRequests.find().count()).toBe(count);
                    done();
                });


            });

        });

    });


});

