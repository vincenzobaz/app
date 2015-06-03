
const en = {

  TLWhenDidYouShareThisPost: 'When did you share this post?',
  MCWhoLikedYourPost: 'Who liked this post you made?',
  MCWhoCommentedOnYourPost: 'Who commented on this post you made?',
  GeoWhatCoordinatesWereYouAt: 'Where were you when you posted this?',
  MCWhichPageDidYouLike: 'Which page did you like?'

};

const titles = {
  en
};

module.exports = (type, lang = 'en') => titles[lang][type]

