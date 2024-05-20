const fs = require('fs');
const path = require('path');

function convertMarkdownTableToCSV(filePath) {
  // Read the markdown text from a file
  const markdownText = fs.readFileSync(filePath, 'utf-8');

  // Split the input text by lines
  const lines = markdownText.trim().split('\n').slice(2);
  const csvLines = lines.map((line) => {
    // Split each line by '|' and trim whitespace from each column
    const columns = line
      .split('|')
      .map((column) => column.trim())
      .filter((column) => column !== '');
    // Join the columns with ',' to format it as CSV
    return columns.join(',');
  });

  // Join all processed lines with a newline character to form the final CSV text
  return csvLines.join('\n');
}

// Example usage
const filePath = path.join(__dirname, 'ConvertMarkDownTableToCSV.md');
const csvText = convertMarkdownTableToCSV(filePath);
console.log(csvText);
