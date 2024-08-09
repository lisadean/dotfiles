/* global use, db */
use('core');

function findAllArticlesOfType(type, onlyActive) {
  const contentTypeRegex = new RegExp(type);
  const items = db.contentItemActive.find(
    {
      $and: [
        { 'content._type': contentTypeRegex },
        { 'group.identities.0.storeId': 248 },
      ],
    },
    {
      // 'content._type': true,
      // 'group._id': true,
      // 'group.description': true,
      // _id: true,
    }
  );
  function isActive(date) {
    if (!date) {
      return true;
    }
    return new Date(date) > new Date();
  }

  if (items.length <= 0) {
    console.log('No items found');
  } else {
    items.forEach((item) => {
      if (onlyActive && !isActive(item.schedule.to)) return;
      console.log(item.group.identities, item.content._type);
    });
  }
}

findAllArticlesOfType('promo', false);
