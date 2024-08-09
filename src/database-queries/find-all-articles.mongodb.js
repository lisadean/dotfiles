/* global use, db */
use('core');

function findAllArticles(onlyActive) {
  const items = db.contentItemActive.find(
    {
      $and: [
        { 'group.type': 'ARTICLE' },
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
      if (onlyActive && item && item.schedule && !isActive(item.schedule.to))
        return;
      console.log(item.group, item.content._type, item.description);
    });
  }
}

findAllArticles(true);
