const { contextBridge } = require("electron");
const GhIssues = require("./scripts/github/issues");
const GithubIssuesInstance = new GhIssues();

contextBridge.exposeInMainWorld("api", {
  github: {
    initialize: () => {
      GithubIssuesInstance.initialize();
    },
  },
});
