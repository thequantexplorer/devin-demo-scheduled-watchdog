# Devin demo: Scheduled watchdog automation

**What it shows:** Devin creates an Automation that runs tests, `npm audit`, `npm outdated` and a bug-issue check every weekday, posts the result to Slack, and opens a PR or issue when something fails.

**Needs:** GitHub and Slack connected to your Devin org

More demos: [devin-advanced-demos](https://github.com/thequantexplorer/devin-advanced-demos)

## Set it up

1. Click **Use this template → Create a new repository**, choose your GitHub account or org as the owner, and keep the name `devin-demo-scheduled-watchdog`. The links and prompt below assume that name. Use the template rather than a fork: pull requests on a fork go to the original repo by default.
2. In Devin, open [**Settings → Connections → GitHub**](https://app.devin.ai/settings/connections/github) and make sure Devin can access the new repository.
3. Connect **Slack** in Devin under **Settings → Connections** and run `/invite @Devin` in the channel you want reports in. Devin won't create the automation if it can't post there.

## Prompt

Start a new Devin session and paste this. Replace `<you>` with your GitHub user or org, and change the Slack channel.

```text
Set up a Devin Automation for https://github.com/<you>/devin-demo-scheduled-watchdog that acts as an always-on dependency & health watchdog:

- Schedule: every weekday at 9:00 America/Chicago.
- Each run: install, run the full test suite, run `npm audit --omit=dev` and `npm outdated`, and check the repo's open issues labeled "bug".
- If anything is newly failing or a high/critical advisory appears, open a fix PR (or a GitHub issue if it needs a human) and post a short summary to Slack #engineering; if everything is green, post a one-line "all clear".

Create the automation, then trigger one run now so we can see the first report, and tell me how to view/edit it.
```
