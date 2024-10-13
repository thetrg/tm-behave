// import restana from 'restana';
// import cors from 'cors';
import bodyParser from 'body-parser';
// import coverage from 'istanbul-middleware';
import serveStatic from 'serve-static';
import { join } from 'path';
import { fileURLToPath } from 'url';
import express from 'express';

export async function start () {
  let app, base, port;

  port = 5001;
  // app = restana ();
  app = express ();
  // app.use (cors ());

  // let content = serveStatic (ASSETS_DIR);
  // console.log (content.toString ());
  // console.log ('- path:', join (fileURLToPath (import.meta.url), '../../../../', 'public'));
  
  base = join (fileURLToPath (import.meta.url), '../../../../');
  if (process.platform === 'win32') {
    base = join (import.meta.url.substring (8), '../../../../').replace (/\\/g, '/');
    console.log ('base:', base);
  }

  app.use ('/', serveStatic (join (fileURLToPath (import.meta.url), '../../../../', 'public')));
  app.use ('/asset', serveStatic (join (ASSETS_DIR)));
  app.use ('/asset', serveStatic (join (ASSETS_DIR, 'vendor')));

  // app.use (files);
  // app.use (files ('/asset', ASSETS_DIR, 'vendor'));

  console.log('Turn on coverage reporting at /coverage');  
  app.use (bodyParser.json ());
  
  app.get ('/coverage', createShowCoverageReportHandler ({ app }));

  app.post ('/api/kohi/reporter/coverage', createGenerateCoverageReportHandler ({ app, base }));

  app.get ('/api/status', (req, res) => res.send ({ status: 'ok' }));

  // console.log ('WHAT:', ASSETS_DIR);

  // // send static file for /asset/asset-name
  // app.use('/asset', express.static(ASSETS_DIR));
  // app.use('/asset', express.static(path.join(ASSETS_DIR, 'vendor')));

  // app.post ('/api/kohi/coverage', coverage.createHandler ({ verbose: true, resetOnGet: true }));
  
  console.log (`- starting server on port: ${port}`);
  app.listen (port);
}

function createGenerateCoverageReportHandler (details = {}) {
  let { app, base } = details;
  return async function generateCoverageReport (req, res) {
    let { coverage } = req.body;
    try {
      // console.log (req.body.base);
      console.log ('- got updated coverage:', Date.now ());
      mergeClientCoverage ({ obj: coverage });
  
      // console.log (coverage);
      // let result = istanbul.utils.mergeFileCoverage(coverage, {});
      // let handler = coverage.createHandler ({ verbose: true, resetOnGet: true });
      // handler (req, res);
      //   console.log ('- saving coverage info...');
      //   await fs.outputFile ('./_coverage.json', JSON.stringify (coverage ["/home/ronbravo/projects/kohi/src/js/common/expect/expect.js"], null, 2));
      return res.send ({ status: 'ok' });
    }
    catch (err) {
      console.error (err);
      return res.send ({ status: 'error' }, 500);
    }
  }
}

function createShowCoverageReportHandler (details = {}) {
  let { app } = details;
  return async function showCoverageReport (req, res) {
    let collector, coverage, fileCoverage, filePath, html, linkMapper, outputNode, pathMap, prefix, report, treeSummary;
    // let filePath;
    try {

      filePath = req.query.file;
      if (filePath && filePath.length === 1) {
        filePath = '';
        // console.log ('TRACE:', filePath);
      }

      // var origUrl = url.parse(req.originalUrl).pathname,
      //   origLength = origUrl.length;
      // if (origUrl.charAt(origLength - 1) !== '/') {
      //   origUrl += '/';
      // }

      prefix = prefix || '';
      // if (prefix.charAt(prefix.length - 1) !== '/') {
      //     prefix += '/';
      // }
      // prefix = '/';

      collector = new istanbul.Collector ();
      coverage = getCoverageObject ();
      utils.removeDerivedInfo (coverage);

      collector.add (coverage);
      treeSummary = getTreeSummary (collector);
      pathMap = getPathMap (treeSummary);

      filePath = filePath || treeSummary.root.fullPath ();

      console.log ('- view:', filePath);
      outputNode = pathMap [filePath];

      if (!outputNode) {
        return res.send (`<h1>Error: Something went wrong</h1> No coverage for file path: [${filePath}]`, 404, { 'Content-Type': 'text/html' });
      }

      linkMapper = {
        hrefFor: function (node) {
          return prefix + '/coverage?file=' + node.fullPath ();
        },
        fromParent: function (node) {
          return this.hrefFor(node);
        },
        ancestor: function (node, num) {
          var i;
          for (i = 0; i < num; i += 1) {
              node = node.parent;
          }
          return this.hrefFor(node);
        },
        asset: function (node, name) {
          return prefix + 'asset/' + name;
        },
      }

      report = Report.create ('html', { linkMapper });
      
      if (outputNode.kind === 'dir') {
        report.writeIndexPage (res, outputNode);
      }
      else {
        fileCoverage = coverage [outputNode.fullPath ()];
        utils.addDerivedInfoForFile (fileCoverage);
        report.writeDetailPage (res, outputNode, fileCoverage);
        // console.log (fileCoverage);
        // html = '<h1>Hello Report World!</h1>';
        // return res.send (html, 200, { 'Content-Type': 'text/html' });
      }

      // <link rel="icon" type="image/x-icon" href="/image/favicon.ico">

      return res.end ();
      // html = '<h1>Hello Report World!</h1>';
      // return res.send (html, 200, { 'Content-Type': 'text/html' });
    }
    catch (err) {
      console.error (err);
      return res.send ('<h1>Error: Something went wrong</h1>', 500, { 'Content-Type': 'text/html' });
    }
  }
}

// ----------------------------------------------------------------
import istanbul from 'istanbul';

const { assetsDir: ASSETS_DIR, Report, TreeSummarizer, utils } = istanbul;

// Ensure the coverage object exists on the global space.
function getCoverageObject () {
  globalThis.__coverage__ = globalThis.__coverage__ || {};
  return globalThis.__coverage__;
}

function mergeClientCoverage (details = {}) {
  let { obj } = details;
  let added, coverage, original, result;
  if (!obj) { return; }
  coverage = getCoverageObject ();

  Object.keys (obj).forEach (function (filePath) {
    // console.log ('- merging:', filePath);
    original = coverage [filePath];
    added = obj [filePath];
    
    if (original) {
      result = utils.mergeFileCoverage (original, added);
    } else {
      result = added;
    }
    coverage [filePath] = result;
  });
}

function getTreeSummary (collector) {
  var summarizer = new TreeSummarizer ();
  collector.files ().forEach (function (key) {
    summarizer.addFileCoverageSummary (key, utils.summarizeFileCoverage (collector.fileCoverageFor (key)));
  });
  return summarizer.getTreeSummary ();
}

function getPathMap (treeSummary) {
  let ret = {};

  function walker (node) {
    ret[node.fullPath ()] = node;
    node.children.forEach (function ( child) {
      walker (child);
    });
  }
  walker (treeSummary.root);
  return ret;
}

/*
    'C:/Users/r-bravo/projects/kohi/src/js/browser/main.js': {
      path: 'C:/Users/r-bravo/projects/kohi/src/js/browser/main.js',
      statementMap: [Object],
      fnMap: [Object],
      branchMap: {},
      s: [Object],
      f: [Object],
      b: {},
      inputSourceMap: [Object],
      _coverageSchema: '1a1c01bbd47fc00a2c39e90264f33305004495a9',
      hash: 'b113050faaba760be8ef693841736306c883d22a'
    }

    'C:/Users/r-bravo/projects/kohi/src/js/browser/main.js': {
      path: 'C:/Users/r-bravo/projects/kohi/src/js/browser/main.js',
      statementMap: [Object],
      fnMap: [Object],
      branchMap: {},
      s: [Object],
      f: [Object],
      b: {},
      inputSourceMap: [Object],
      _coverageSchema: '1a1c01bbd47fc00a2c39e90264f33305004495a9',
      _coverageSchema: '1a1c01bbd47fc00a2c39e90264f33305004495a9',
      hash: 'b113050faaba760be8ef693841736306c883d22a'
      hash: 'b113050faaba760be8ef693841736306c883d22a'
    }


    'C:/Users/r-bravo/projects/kohi/src/js/common/kohi.js': {
      path: 'C:/Users/r-bravo/projects/kohi/src/js/common/kohi.js',
      statementMap: [Object],
      fnMap: [Object],
      branchMap: [Object],
      s: [Object],
      f: [Object],
      b: [Object],
      inputSourceMap: [Object],
      _coverageSchema: '1a1c01bbd47fc00a2c39e90264f33305004495a9',
      hash: 'bd8462644ea486966509dacdf7ec8b12b51506bf'
    },

    'C:/Users/r-bravo/projects/kohi/src/js/common/kohi.js': {
      path: 'C:/Users/r-bravo/projects/kohi/src/js/common/kohi.js',
      statementMap: [Object],
      fnMap: [Object],
      branchMap: [Object],
      s: [Object],
      f: [Object],
      b: [Object],
      inputSourceMap: [Object],
      _coverageSchema: '1a1c01bbd47fc00a2c39e90264f33305004495a9',
      hash: '00f5b9778489de567bcaaffa7a2bfc6bf3e1bacc'
    },
*/
