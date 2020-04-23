// the script allows us to support typescript in cypress test
const wp = require("@cypress/webpack-preprocessor");
const istanbul = require("istanbul-lib-coverage");
const {join} = require("path");
const url = require('url');
const webpackOptions = require('../../build/cypress.config');
const {existsSync, mkdirSync, readFileSync, writeFileSync} = require("fs");
const execa = require("execa");
const debug = require("debug")("code-coverage");

/**
 * Replace source-map's path by the corresponding absolute file path (coverage report wouldn't work
 * with source-map path being relative or containing Webpack loaders and query parameters)
 */
function fixToAbsoluteSourcePaths(coverage) {
  Object.values(coverage).forEach((file) => {
    const {path: absolutePath, inputSourceMap} = file;
    const fileName = (/([^\/\\]+)$/).exec(absolutePath)[1];
    if (!inputSourceMap || !fileName) {
      return;
    }

    if (inputSourceMap.sourceRoot) {
      inputSourceMap.sourceRoot = "";
    }
    inputSourceMap.sources = inputSourceMap.sources.map((source) => (source.includes(fileName) ? absolutePath : source));
  });
}

// These are standard folder and file names used by NYC tools
const processWorkingDirectory = process.cwd();
const outputFolder =require('./../../.nycrc.json')['temp-dir'];
const coverageFolder = join(processWorkingDirectory, outputFolder);
const nycFilename = join(coverageFolder, "out.json");


function saveCoverage(coverage) {
  if (!existsSync(coverageFolder)) {
    mkdirSync(coverageFolder, {recursive: true});
    debug("created folder %s for output coverage", coverageFolder);
  }

  writeFileSync(nycFilename, JSON.stringify(coverage, null, 2));
}

let pact;
module.exports = (on, config) => {
  /**
   * on("task") method allows to create tasks in cypress.
   * Please check https://docs.cypress.io/api/commands/task.html#Syntax
   * the code is copied from require('@cypress/code-coverage/task'))
   * in order to remove hardcoded configurations like outputFolder, reportDirectory, reporter,
   **/
  on("task", {
    /**
     * Clears accumulated code coverage information.
     *
     * Interactive mode with "cypress open"
     *    - running a single spec or "Run all specs" needs to reset coverage
     * Headless mode with "cypress run"
     *    - runs EACH spec separately, so we cannot reset the coverage
     *      or we will lose the coverage from previous specs.
     */
    resetCoverage({isInteractive}) {
      if (isInteractive) {
        debug("reset code coverage in interactive mode");
        const coverageMap = istanbul.createCoverageMap({});
        saveCoverage(coverageMap);
      }

      /*
       * Else in headless mode, assume the coverage file was deleted before the `cypress run` command was called
       * example: rm -rf .nyc_output || true
       */
      return null;
    },

    /**
     * Combines coverage information from single test with previously collected coverage.
     *
     * @param {string} sentCoverage Stringified coverage object sent by the test runner
     * @returns {null} Nothing is returned from this task
     */
    combineCoverage(sentCoverage) {
      const coverage = JSON.parse(sentCoverage);
      debug("parsed sent coverage");

      fixToAbsoluteSourcePaths(coverage);
      const previous = existsSync(nycFilename)
        ? JSON.parse(readFileSync(nycFilename))
        : istanbul.createCoverageMap({});
      const coverageMap = istanbul.createCoverageMap(previous);
      coverageMap.merge(coverage);
      saveCoverage(coverageMap);
      debug("wrote coverage file %s", nycFilename);

      return null;
    },

    /**
     * Saves coverage information as a JSON file and calls NPM script to generate HTML report
     */
    coverageReport() {
      if (!existsSync(nycFilename)) {
        console.warn("Cannot find coverage file %s", nycFilename);
        console.warn("Skipping coverage report");
        return null;
      }

      const nycrc =require('./../../.nycrc.json');
      const reportDir = nycrc['report-dir'];
      const reporter = nycrc.reporter;
      const reporters = Array.isArray(reporter)
        ? reporter.map((name) => `--reporter=${name}`)
        : `--reporter=${reporter}`;

      // Should we generate report via NYC module API?
      const command = "nyc";
      const args = [
        "report",
        "--report-dir",
        reportDir,
        "--temp-dir",
        coverageFolder,
      ].concat(reporters);
      debug(
        "saving coverage report using command: \"%s %s\"",
        command,
        args.join(" "),
      );
      debug("current working directory is %s", process.cwd());
      return execa(command, args, {stdio: "inherit"});
    },
  });

  on("file:preprocessor", wp({webpackOptions}));
};
