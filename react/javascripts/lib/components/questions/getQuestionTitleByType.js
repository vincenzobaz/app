
const en = {

  TLWhenDidYouShareThisPost: 'When did you share this post?',
  MCWhoLikedYourPost: 'Who liked this post you made?',
  GeoWhatCoordinatesWereYouAt: 'Where were you when you posted this?'

};

const titles = {
  en
};

module.exports = (type, lang = 'en') => titles[lang][type]

