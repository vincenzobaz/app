Jasmine.onTest(function () {
    "use strict";
    describe("JoinRequest", function() {
var userId;
        beforeAll(function() {
            userId = Accounts.createUser({username: 'test-user', password:'pwd'});
            console.log("damn")

        });

        afterAll(function(){
            Meteor.users.remove(userId);
        });

        beforeEach(function(){
            //spyOn(Meteor, 'userId').and.callFake(function(){
            //    return '555';
            //});
            spyOn(Meteor, 'userId').and.returnValue('2341');
        });

        it("should be able to play a Song", function() {
            Meteor.call('JoinRequest.send', ['4422211'], function(error, result){
                expect(result).toBeDefined();
                expect(result.status).toBe("success");
            });
        });

    });
});
