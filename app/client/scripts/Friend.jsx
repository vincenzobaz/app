
//const FriendProps = ['_id', 'userId', 'facebookId', 'name', 'friendOf', 'isBot'];

export class Friend {

    constructor(props) {
       assignProps(this, FriendProps, props);
    }

   getId() {
       return this._id;
   }
  
   getUserId() {
       return this.userId;
   }
  
   hasUserId() {
     return this.getUserId() != null;
   }
  
   getFacebookId() {
       return this.facebookId;
   }
  
   getName() {
       return this.name;
   }
  
   getFriendOf() {
       return this.friendOf;
   }
  
   isABot() {
       return !!this.isBot;
   }
  
   getAvatarUrl() {
       var Routes = Reminisce.Routes;
  
       if (this.isABot()) {
           return Routes.Assets.avatars.bot();
       }
  
       if (this.getFacebookId() != null) {
         return Routes.Assets.avatars.facebook(this.getFacebookId());
       }
  
       return Routes.Assets.avatars.default();
   }
  
  static fromRaw() {
   return new Friend(data);
  }

}
