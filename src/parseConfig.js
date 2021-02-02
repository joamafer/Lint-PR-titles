const ConfigParser = require('./ConfigParser');

module.exports = function parseConfig() {
  let subjectPattern;
  if (process.env.INPUT_SUBJECTPATTERN) {
    subjectPattern = ConfigParser.parseString(process.env.INPUT_SUBJECTPATTERN);
  }

  let subjectPatternError;
  if (process.env.INPUT_SUBJECTPATTERNERROR) {
    subjectPatternError = ConfigParser.parseString(
      process.env.INPUT_SUBJECTPATTERNERROR
    );
  }

  return {
    subjectPattern,
    subjectPatternError
  };
};
