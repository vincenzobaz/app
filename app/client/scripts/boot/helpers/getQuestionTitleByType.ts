
import {SubjectType} from "../../../../common/models/questions/common/SubjectType";
const en = {

  TLWhenDidYouShareThisPost: 'When did you share this post?',
  TLWhenDidYouLikeThisPage: 'When did you like this page?',
  ORDPageLike: 'Order these pages according to the number of likes: most likes on top',
  ORDPageLikes: 'Order these pages according to the number of likes: most likes on top',
  ORDPageLikeTime: 'Order these pages after the time you liked them: earliest on top',
  ORDPostCommentsNumber: 'Order these posts according to the number of comments they got: most comments first',
  ORDPostLikesNumber: 'Order these posts according to the number of likes: fewest likes on top',
  ORDPostTime: 'Order theses posts after the time you posted them: oldest on top',
  MCWhoLikedYourPost: 'Who liked this post you made?',
  MCWhoCommentedOnYourPost: 'Who commented on this post you made?',
  MCWhoMadeThisCommentOnYourPost: 'Who made this comment on your post?',
  GeoWhatCoordinatesWereYouAt: 'Where were you when you posted this?',
  MCWhichPageDidYouLike: 'Which page did you like?'
  
};

const titles = {
  en
};

export function getQuestionTitleByType(type: string, lang = 'en') { return titles[lang][type] }

