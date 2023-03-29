module.exports = {
  ci: {
    collect: {
      extends: 'lighthouse:default',
      url: 'http://localhost:9000/product/summary/433454',
      numberOfRuns: 5,
      settings: {
        onlyCategories: ['performance'],
        // throttlingMethod: 'devtools',
        // chromeFlags: 'headless',
        extraHeaders: JSON.stringify({
          Cookie: 'feat-google-tag-manager=false',
        }),
        // onlyAudits: [
        //   'third-party-summary',
        //   'first-meaningful-paint',
        //   'speed-index',
        //   'interactive',
        // ],
      },
    },
    assert: {
      // assert options here
    },
    upload: {
      target: 'filesystem',
      outputDir: '/Users/abb2175/work/react-build-store/lighthouse',
    },
    server: {
      // server options here
    },
    wizard: {
      // wizard options here
    },
  },
};
