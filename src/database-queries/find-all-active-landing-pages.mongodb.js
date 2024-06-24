use('core');
function findAllActiveLandingPages(listType) {
  const items = db.contentItemActive.find(
    {
      $and: [{ 'group.type': 'ROUTE' }, { 'group.identities.0.storeId': 248 }],
    },
    {}
  );
  function isActive(item) {
    if (!item.schedule?.to && !item.schedule?.from) {
      return true;
    }
    if (!item.schedule?.from && item.schedule?.to) {
      return new Date(item.schedule?.to) > new Date();
    }
    if (!item.schedule?.to && item.schedule?.from) {
      return new Date(item.schedule?.from) < new Date();
    }
    if (item.schedule?.to && item.schedule?.from) {
      return (
        new Date(item.schedule?.to) > new Date() &&
        new Date(item.schedule?.from) < new Date()
      );
    }
  }

  if (items.length <= 0) {
    console.log('No items found');
  } else {
    items.forEach((item) => {
      if (isActive(item)) {
        if (listType) {
          console.log(
            `${item.group.identities[0].route} ${item.content._type}`
          );
        } else {
          console.log(item.group.identities[0].route);
        }
      }
    });
  }
}
findAllActiveLandingPages(false);
