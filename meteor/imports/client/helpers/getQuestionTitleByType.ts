
import {SubjectType} from "../../common/models/questions/common/SubjectType";

const en = {
  TLWhenDidYouShareThisPost: 'When did you share this post?',
  TLWhenDidYouLikeThisPage: 'When did you like this page?',
  ORDPageLike: 'Order these pages according to the number of likes: most likes on top',
  ORDPageLikes: 'Order these pages according to the number of likes: least likes on top',
  ORDPageLikeTime: 'Order these pages after the time you liked them: earliest on top',
  ORDPostCommentsNumber: 'Order these posts according to the number of comments they got: least comments first',
  ORDPostLikesNumber: 'Order these posts according to the number of likes: fewest likes on top',
  ORDPostTime: 'Order theses posts after the time you posted them: oldest on top',
  MCWhoReactedToYourPost: 'Who reacted (Like, Wow, Haha, Love, Sad, Angry, Thankful) to this post you made?',
  MCWhoReactedToYourPostWithLIKE: 'Who liked this post you made?',
  MCWhoReactedToYourPostWithWOW: 'Who was impressed by this post you made?',
  MCWhoReactedToYourPostWithHAHA: 'Who laughed at this post you made?',
  MCWhoReactedToYourPostWithLOVE: 'Who loved this post you made?',
  MCWhoReactedToYourPostWithSAD: 'Who was sad about this post you made?',
  MCWhoReactedToYourPostWithANGRY: 'Who was angry at this post you made?',
  MCWhoCommentedOnYourPost: 'Who commented on this post you made?',
  MCWhoMadeThisCommentOnYourPost: 'Who made this comment on your post?',
  GeoWhatCoordinatesWereYouAt: 'Where were you when you posted this?',
  MCWhichPageDidYouLike: 'Which page did you like?'
};

const titles = {
  en
};

export function getQuestionTitleByType(type: string, lang = 'en') { return titles[lang][type] }

