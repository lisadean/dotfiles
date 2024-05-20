/* global use, db */
use('core');

function grant() {
  use('core');
  db.getCollection('contentItemActive').createIndex({
    'content._type': 'text',
  });
  const articles = db.getCollection('contentItemActive').find(
    {
      $or: [
        // { 'content._type': /article@/ },
        { 'content._type': /article-vendor-product-spotlight@/ },
        // { 'content._type': /article-before-after@/ },
      ],
    },
    {
      'content._type': true,
      'group._id': true,
    }
  );

  function findArticlesThatReference(referencedArticleId) {
    return db.getCollection('contentItemActive').find(
      {
        $and: [
          { 'content.related_articles.selected': referencedArticleId },
          { 'group.identities.0.storeId': 248 },
          { 'content._type': /article@/ },
        ],
      },
      {
        group: true,
        'content.slug': true,
        'content._type': true,
        'content.related_articles': true,
      }
    );
  }

  function getArticleById(articleId) {
    return db
      .getCollection('contentItemActive')
      .find({ 'group._id': articleId }, { 'group._id': true, content: true });
  }

  const map = {};

  articles.forEach((beforeAfterArticle) => {
    findArticlesThatReference(beforeAfterArticle.group._id).forEach(
      (article) => {
        const type = beforeAfterArticle.content._type;
        const str = `${article.group._id} (${article.content._type}) references ${beforeAfterArticle.group._id} (${type})`;
        if (map[type]) {
          map[type].push(str);
        } else {
          map[type] = [str];
        }
      }
    );
  });

  console.log(JSON.stringify(map, null, 2));
}

function me() {
  use('core');

  db.getCollection('contentItemActive').createIndex({
    'content._type': 'text',
  });
  const items = db
    .getCollection('contentItemActive')
    .find(
      {
        /*
         * Filter
         * fieldA: value or expression
         */
        $and: [
          { 'content._type': /category-drop@4/ },
          { 'group.identities.0.storeId': 248 },
          { status: 'ACTIVE' },
        ],
      },
      {
        /*
         * Projection
         * _id: 0, // exclude _id
         * fieldA: 1 // include field
         */
        'content._type': true,
        'group._id': true,
        'group.description': true,
        _id: true,
      }
    )
    .sort({
      /*
       * fieldA: 1 // ascending
       * fieldB: -1 // descending
       */
    });

  const itemMap = {};

  items.forEach(
    (item) =>
      (itemMap[item.group._id] = {
        id: item._id,
        type: item.content._type,
        groupDesc: item.group.description,
      })
  );

  console.log(JSON.stringify(itemMap, null, 2));
}

// me();

// // Find all docs with brand multiselect being used in savings center
// use('core');
// db.getCollection('contentItemActive').find(
//   {
//     /*
//      * Filter
//      * fieldA: value or expression
//      */
//     $and: [
//       { 'content._type': /savings-center@/ },
//       // { 'content._type': /category-drop@2/ },
//       // { 'content._type': /article-vendor-product-spotlight/ },

//       // { 'content._type': { $not: /category/ } },
//       // { 'content._type': { $not: /article/ } },

//       // landing pages
//       { 'group.type': 'ROUTE' },

//       // { 'content._type': /savings-center/ },

//       { 'group.identities.0.storeId': 248 },
//       // { 'group.identities.0.route': '/lisatest' },
//       {
//         'content.sale_section.items.0.savings_center_sections.items.0.doorbuster_products.selected.0.brand._type':
//           { $exists: true },
//       },
//       { status: 'ACTIVE' },
//     ],
//   },
//   {
//     /*
//      * Projection
//      * _id: 0, // exclude _id
//      * fieldA: 1 // include field
//      */
//     // description: true,
//     // 'group.description': true,
//     // 'group.identities.route': true,
//     // 'group.typeGroupName': true,
//     // 'content._type': true,
//   }
// );

// Find all landing pages of the savings-center type for build
function findSavingsCenterLandingPages() {
  use('core');
  const items = db.contentItemActive.find(
    {
      /*
       * Filter
       * fieldA: value or expression
       */
      $and: [
        { 'content._type': /savings-center@/ },
        // landing pages
        { 'group.type': 'ROUTE' },
        { 'group.identities.0.route': '/savings' },

        { 'group.identities.0.storeId': 248 },
        // { 'group.identities.0.route': '/lisatest' },
        { status: 'ACTIVE' },
      ],
    },
    {
      /*
       * Projection
       * _id: 0, // exclude _id
       * fieldA: 1 // include field
       */
      // description: true,
      // 'group.description': true,
      // 'group.identities.route': true,
      // 'group.typeGroupName': true,
      // 'content._type': true,
    }
  );
  function isActive(date) {
    if (!date) {
      return true;
    }
    return new Date(date) > new Date();
  }

  items.forEach((item) => {
    if (isActive(item.schedule.to)) {
      console.log(item.group.identities[0].route);
    }
  });
}
// findSavingsCenterLandingPages();

// find all landing pages for build and summarize by content type
// use('core');
// db.contentItemActive
//   .aggregate([
//     {
//       $match: {
//         $and: [
//           // landing pages
//           { 'group.type': 'ROUTE' },
//           { 'group.identities.0.storeId': 248 },
//           { status: 'ACTIVE' },
//         ],
//       },
//     },
//     {
//       $group: {
//         _id: '$content._type',
//         count: { $sum: 1 },
//       },
//     },
//   ])
//   .sort({ count: -1 });

// Find all landing pages of the savings-center type for build
function listActiveLandingPageRoutesWithType() {
  use('core');
  const items = db.contentItemActive.find(
    {
      /*
       * Filter
       * fieldA: value or expression
       */
      $and: [
        // landing pages
        { 'group.type': 'ROUTE' },
        { 'group.identities.0.storeId': 248 },
      ],
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

  items.forEach((item) => {
    if (isActive(item)) {
      console.log(`${item.group.identities[0].route} ${item.content._type}`);
    }
  });
}

db.getCollection('contentItemActive').aggregate([
  {
    $project: {
      items: { $objectToArray: '$$ROOT' },
    },
  },
  {
    $unwind: '$items',
  },
  {
    $match: {
      'items.v': /savings-center@/, // Adjust the condition based on the actual value you're looking for
    },
  },
]);
