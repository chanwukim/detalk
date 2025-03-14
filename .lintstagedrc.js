import path from "path";

function buildEslintCommand(filenames) {
  return `next lint --fix --file ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(" --file ")}`;
}

const lintStagedConfig = {
  "*.{js,jsx,ts,tsx}": ["prettier --write", buildEslintCommand],
};

export default lintStagedConfig;
