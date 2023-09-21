// eslint-disable-next-line import/no-extraneous-dependencies
const ts = require('typescript');
const fs = require('fs');
const path = require('path');

const searchDir = process.cwd(); // Use the current working directory

const countExports = (filePath) => {
	const stats = fs.statSync(filePath);
	const fileSize = (stats.size / 1024).toFixed(2);
	const fileContents = fs.readFileSync(filePath, 'utf-8');

	const sourceFile = ts.createSourceFile(filePath, fileContents, ts.ScriptTarget.Latest, /* setParentNodes */ true);

	const exportCounts = {};

	function visit(node) {
		if (ts.isExportAssignment(node) && ts.isFunctionDeclaration(node.expression)) {
			const functionName = node.expression.name.text;
			const functionText = node.expression.getText(sourceFile);
			const characterCount = functionText.length;
			exportCounts[functionName] = characterCount;
		}
		ts.forEachChild(node, visit);
	}

	visit(sourceFile);

	return {
		exportCount: Object.keys(exportCounts).length,
		fileSize,
		exportCounts
	};
};

const getExportCounts = (dirPath) => {
	let exportCounts = [];
	const files = fs.readdirSync(dirPath);
	for (const file of files) {
		const filePath = path.join(dirPath, file);
		const stats = fs.statSync(filePath);
		if (stats.isDirectory() && !filePath.includes('lcov-report')) {
			exportCounts = exportCounts.concat(getExportCounts(filePath));
		} else if (filePath.match(/\.queries\./) && !filePath.includes('lcov-report')) {
			const { exportCount, fileSize, exportCounts: functionCounts } = countExports(filePath);
			const fileName = path.basename(filePath);
			exportCounts.push({ fileName, exportCount, fileSize, functionCounts });
		}
	}
	return exportCounts;
};

const exportCounts = getExportCounts(searchDir);
exportCounts.sort((a, b) => b.exportCount - a.exportCount);

console.table(exportCounts);
