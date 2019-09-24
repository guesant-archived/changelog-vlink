module.exports = (links, releases) => {
  const unreleasedTxt = `[Unreleased]: ${links.repo}/${links.compare}/v${
    releases[0]
  }...HEAD`;

  const diffTxt = releases.map((releaseVersion, index, array) => {
    if (index == array.length - 1) {
      return `[${releaseVersion}]: ${links.repo}/${links.releases}/v${releaseVersion}`;
    } else {
      let releases = `[${releaseVersion}]: ${links.repo}/${links.compare}/`;

      const prevVersion = array[index + 1];
      releases += `v${prevVersion}...v${releaseVersion}`;
      return releases;
    }
  });

  const releasesTxt = releases.map(
    releaseVersion =>
      `[${releaseVersion}]: ${links.repo}/${links.releases}/v${releaseVersion}`
  );

  return { unreleasedTxt, diffTxt, releasesTxt };
};
