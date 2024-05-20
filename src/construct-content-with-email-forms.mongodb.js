use('core');

var emailFormRegex = /^email-form-section@/;

function traverse(input, callback, path = []) {
  return Object.keys(input).find((key) => {
    const obj = input[key];
    const currentPath = path.concat(key); // Update the current path
    if (obj === Object(obj)) {
      // Check if it's an object
      const result = callback(obj, currentPath.join('.'));
      if (result) {
        // console.log('found here: ' + currentPath);
        return true; // Found the object, stop searching
      } else {
        // Continue searching deeper
        return traverse(obj, callback, currentPath);
      }
    }
    return false; // Not the object we're looking for
  });
}
console.log('route or articleId' + ' (' + 'content._type & key name' + ')');
db.contentItemActive
  .find(
    {
      $or: [
        { 'content._type': /article@/ },
        { 'content._type': /features-benefits-template@/ },
        { 'content._type': /promotional-template@/ },
        { 'content._type': /savings-center@/ },
        { 'content._type': /sitewide-sales-template@/ },
      ],
      // _id: ObjectId('5af22e59e133a917e8dd0912'),
    },
    {
      // 'content._type': true,
      // 'group._id': true,
    }
  )
  // .limit(1000)
  .forEach(function (item) {
    var content = item.content,
      found = false,
      foundHere = '';

    const keyName = traverse(content, function (obj, keyPath) {
      if (obj._type && emailFormRegex.test(obj._type)) {
        found = true;
        foundHere = keyPath;
        // don't traverse this object's children
        return true;
      }
    });

    if (found) {
      console.log(
        (item.group.identities[0].route || item.group.identities[0].articleId) +
          ' (' +
          content._type +
          ': ' +
          foundHere +
          ') id: ' +
          item._id
      );
    }
  });
