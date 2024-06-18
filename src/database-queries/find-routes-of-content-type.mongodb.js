use('core');
function findRoutesOfContentType(contentType, active) {
  const contentTypeRegex = new RegExp(contentType);
  const items = db.contentItemActive.find(
    {
      $and: [
        { 'content._type': contentTypeRegex },
        { 'group.type': 'ROUTE' },
        { 'group.identities.0.storeId': 248 },
        { status: 'ACTIVE' },
      ],
    },
    {}
  );
  function isActive(date) {
    if (!date) {
      return true;
    }
    return new Date(date) > new Date();
  }

  items.forEach((item) => {
    if (active) {
      if (isActive(item.schedule.to)) {
        console.log(item.group.identities[0].route);
      }
    } else {
      console.log(item.group.identities[0].route);
    }
  });
}
findRoutesOfContentType('sitewide', true);
console.log('---');
findRoutesOfContentType('sitewide', false);
