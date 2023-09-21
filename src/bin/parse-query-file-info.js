const fs = require('fs');

const fileContents = fs.readFileSync('query-files.txt', 'utf-8');
const lines = fileContents.split('\n');

const fileData = lines.map((line) => {
  const [lineCount, filePath] = line.trim().split(' ');
  const fileName = filePath.split('/').pop();
  return { fileName, lineCount: parseInt(lineCount, 10) };
});

const sortedFileData = fileData.sort((a, b) => b.lineCount - a.lineCount);

sortedFileData.forEach(({ fileName, lineCount }) => {
  console.log(`${fileName}: ${lineCount}`);
});
