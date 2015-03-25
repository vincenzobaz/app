
Meteor.startup(function () {
    // code to run on server at startup
    var myjson = {};
    //myjson = JSON.parse(Assets.getText("json/currentGames.json"));
    //console.log(myjson);

    //if (Meteor.users.count() == 0){
    //    var user1 = JSON.parse(Assets.getText("json/users/user1.json"));
    //    Meteor.users.insert(user1)
    //}

    Accounts.createUser({
        username: "mino",
        email : "minos@mai.com",
        password : "something",
        profile  : {
            //publicly visible fields like firstname goes here
            firstname:
        }

    });

    if (Gameboards.find().count() == 0){
        console.log("We have no gameboards");
    }
    console.log(Meteor.users)
});

Meteor.methods({
    sayHello: function(text){
        console.log("hello " + text);
    }
});
