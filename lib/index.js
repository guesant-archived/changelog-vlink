require('dotenv').config({ path: `${__dirname}/.env` });

const fs = require('fs');
const semver = require('semver');
const changeLogDiff = require('./changelog-diff');

const links = {
  repo: process.env.REPO_LINK || 'https://github.com/user/repo',
  compare: process.env.COMPARE_PATH || 'compare',
  releases: process.env.RELEASES_PATH || 'releases/tag'
};
const matchRegexp = process.env.MATCH_REGEXP || /# \[(.+)\]/g;

const changeLog = fs.readFileSync('CHANGELOG.md', 'utf-8');
const releases = changeLog
  .match(matchRegexp)
  .map(item => item.slice(3, -1))
  .filter(release => semver.valid(release));

// geração do texto baseado no keep-a-changelog
const { unreleasedTxt, diffTxt, releasesTxt } = changeLogDiff(links, releases);

console.log(unreleasedTxt);
console.log(diffTxt.join('\n'));
