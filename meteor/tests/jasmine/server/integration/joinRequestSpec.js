Jasmine.onTest(function () {
    "use strict";
    describe("JoinRequest", function() {
var userId;
        beforeAll(function() {
            userId = Accounts.createUser({username: 'test-user', password:'pwd'});
            console.log("damn");
            JoinRequests.remove({});


        });

        afterAll(function(){
            Meteor.users.remove(userId);
        });

        beforeEach(function(){
            spyOn(Meteor, 'userId').and.returnValue('101');

        });

        it("should insert a joinrequest and return success on successfull insert", function(done) {
            //spyOn(JoinRequests, 'insert');
            var userId = '4422211';
            Meteor.call('JoinRequest.send', userId, function(error, result){
                expect(result).toBeDefined();
                expect(result.status).toBe("success");
                var request = JoinRequests.findOne({_id: result.id});
                expect(request).toBeDefined();
                expect(request.from).toBe('101');
                expect(request.to).toBe(userId);
                done();


            });
        });

        it("should return an error if the insert fails", function(done){
            spyOn(JoinRequests, "insert").and.callFake(function(doc, callback){
               if (!_.isUndefined(callback)){
                   callback("something went wrong", null);
               }
            });
            Meteor.call('JoinRequest.send', '4422211', function(error, result){
                expect(result).toBeDefined();
                expect(result.status).toBe("error");
                done();
            });
        });

    });
});
