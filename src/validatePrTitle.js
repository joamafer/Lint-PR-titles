const conventionalCommitsConfig = require('conventional-changelog-conventionalcommits');
const parser = require('conventional-commits-parser').sync;
const formatMessage = require('./formatMessage');

module.exports = async function validatePrTitle(
  prTitle,
  {subjectPattern, subjectPatternError} = {}
) {

  const {parserOpts} = await conventionalCommitsConfig();
  const result = parser(prTitle, parserOpts);

  if (!result.subject) {
    throw new Error(`No subject found in pull request title "${prTitle}".`);
  }

  function throwSubjectPatternError(message) {
    if (subjectPatternError) {
      message = formatMessage(subjectPatternError, {
        subject: result.subject,
        title: prTitle
      });
    }

    throw new Error(message);
  }

  if (subjectPattern) {
    const match = result.subject.match(new RegExp(subjectPattern));

    if (!match) {
      throwSubjectPatternError(
        `The subject "${result.subject}" found in pull request title "${prTitle}" doesn't match the configured pattern "${subjectPattern}".`
      );
    }

    const matchedPart = match[0];
    if (matchedPart.length !== result.subject.length) {
      throwSubjectPatternError(
        `The subject "${result.subject}" found in pull request title "${prTitle}" isn't an exact match for the configured pattern "${subjectPattern}". Please provide a subject that matches the whole pattern exactly.`
      );
    }
  }
};
