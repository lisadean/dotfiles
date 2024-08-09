use('core');
function getDocumentByRoute(routeName, printDetail) {
  function isActive(date) {
    if (!date) {
      return true;
    }
    return new Date(date) > new Date();
  }
  const regex = new RegExp(routeName);
  const query = () => {
    db.contentItemActive.find(
      {
        $and: [
          { 'group.identities.0.route': regex },
          // { 'group.identities.0.storeId': 248 },
        ],
      },
      {}
    );
  };
  if (printDetail) {
    const items = query();
    if (items.length <= 0) {
      console.log('No items found');
    } else {
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
  } else {
    query();
  }
}
// getDocumentByRoute('general-landing-test', false);
// getDocumentByRoute('electroluxtest', false);

db.contentItemActive.find(
  {
    $and: [
      { 'group.identities.0.route': /electroluxtest/ },
      { 'group.identities.0.storeId': 248 },
    ],
  },
  {}
);
