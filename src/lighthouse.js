const fs = require('fs');

const outputDir = '/Users/abb2175/work/react-build-store/lighthouse';
const configFile = '/Users/abb2175/dotfiles/src/lighthouserc.js';

// $ npx -p @lhci/cli lhci collect --url http://localhost:9000/product/summary/433454 -n 5 --only-categories=performance --emulated-form-factor=mobile --chrome-flags=--headless
// npx -p @lhci/cli lhci upload --target filesystem --outputDir ./lighthouse

const execSync = require('child_process').execSync;

// // Run lighthouse tests
// execSync(`lhci collect --config=${configFile}`, {
//   stdio: 'inherit',
// });
// // Generate lighthouse reports
// execSync(`lhci upload --config=${configFile}`, {
//   stdio: 'inherit',
// });
const metrics = [
  // property, display name, starting value, time unit, display unit, display digits
  ['first-contentful-paint', 'FCP', 0, 'millisecond', 's', 1],
  ['largest-contentful-paint', 'LCP', 0, 'millisecond', 's', 1],
  ['total-blocking-time', 'TBT', 0, 'millisecond', 'ms', 0],
  ['cumulative-layout-shift', 'CLS', 0, 'unitless', '', 3],
  ['interactive', 'TTI', 0, 'millisecond', 's', 1],
  ['max-potential-fid', 'FID', 0, 'millisecond', 'ms', 0],
  ['speed-index', 'SI', 0, 'millisecond', 's', 1],
];
const lhciManifest = require(`${outputDir}/manifest.json`);
const reportFileNames = lhciManifest.map((entry) => entry.jsonPath);
const convertTimeUnits = (metric, value) => {
  if (value) {
    return (metric[3] === 'millisecond') & (metric[4] === 's')
      ? value / 1000
      : value;
  } else {
    return (metric[3] === 'millisecond') & (metric[4] === 's')
      ? metric[2] / 1000
      : metric[2];
  }
};

reportFileNames.forEach((fileName) => {
  const report = {};
  console.log('Processing file: ', fileName);
  const reportJson = JSON.parse(fs.readFileSync(fileName, 'utf-8'));
  metrics.forEach((metric) => {
    const value = reportJson.audits[metric[0]].numericValue;
    report[metric[1]] = `${convertTimeUnits(metric, value).toFixed(
      metric[5]
    )} ${metric[4]}`;
    metric[2] += value;
  });
  console.table(report);
});

metrics.forEach((metric) => {
  const avgValue = convertTimeUnits(metric) / lhciManifest.length;
  console.log(metric[1], ': ', avgValue.toFixed(metric[5]), metric[4]);
});
