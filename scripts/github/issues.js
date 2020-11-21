module.exports = class GhIssues {
  initialize() {
    this.getIssues();

    const reloadButton = document.getElementById("reload-button");
    reloadButton.addEventListener("click", () => {
      this.deleteIssueElements();
      this.getIssues();
    });
  }

  getIssues() {
    this.fetchIssuesFromAPI()
      .then((res) => {
        this.createIssueElements(res);
      })
      .catch((e) => console.error(e));
  }

  fetchIssuesFromAPI() {
    const axios = require("../../plugins/axios");
    return axios
      .get("/issues")
      .then((res) => {
        const issueArray = [];
        res.data.forEach((item) => {
          const issue = {
            title: item.title,
            url: item.html_url,
            milestone: item.milestone?.title,
          };
          issueArray.push(issue);
        });
        return issueArray;
      })
      .catch((e) => {
        console.log(e);
        throw e;
      });
  }

  createIssueElements(issueArray) {
    const inner = document.getElementById("gh-issues__inner");
    inner.classList.add("gh-issues__inner");

    issueArray.forEach((item) => {
      const issueNode = document.createElement("div");
      issueNode.classList.add("gh-issue");
      // title
      const title = document.createElement("h3");
      title.textContent = item.title;
      title.classList.add("gh-issue__title");
      // milestone
      const milestone = document.createElement("p");
      milestone.classList.add("gh-issue__milestone");
      milestone.textContent = item.milestone;

      inner.appendChild(issueNode);
      issueNode.appendChild(title);
      issueNode.appendChild(milestone);

      issueNode.addEventListener("click", () => {
        this.openWebPage(item.url);
      });
    });
  }

  deleteIssueElements() {
    const inner = document.getElementById("gh-issues__inner");
    inner.innerHTML = "";
  }

  openWebPage(url) {
    const { shell } = require("electron");
    shell.openExternal(url);
  }
};
