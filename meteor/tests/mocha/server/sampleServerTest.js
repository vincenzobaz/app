if (!(typeof MochaWeb === 'undefined')){
  MochaWeb.testOnly(function(){
    describe("Server initialization", function(){
        before(function(){
           console.log("we tried");

        });
      it("should have a Meteor version defined", function(){
          console.log("try again");
        chai.assert(Meteor.release);
      });
    });
  });
}
