<img height="125" align="left" style="float: left; margin: 0 10px 0 0;" alt="Pokaimon" src="https://cdn.discordapp.com/attachments/1007204906152767508/1007671728316633249/unknown.png">

# Contributing to Pokaimon
> Guidelines on how to contribute to Pokaimon

## <a name="question"></a> Got a Question or Problem?

Do not open issues for general support questions as we want to keep GitHub issues for bug reports and feature requests. You've got much better chances of getting your question answered on our [Discord server][discord].

Our Discord server is a much better place to ask questions since:

- there are a lot of people willing to help
- questions and answers stay available for public viewing so your question / answer might help someone else

To save your and our time, we will systematically close all issues that are requests for general support and redirect people to our Discord server.

## Found a Bug?
If you find a bug in the source code, you can help us by [submitting an issue](#submit-issue) to our [GitHub repository][github]. Even better, you can [submit a Pull Request](#submit-pr) with a fix.

## <a name="feature"></a> Missing a Feature?
You can *request* a new feature by [submitting an issue](#submit-issue) to our [GitHub repository][github]. If you would like to *implement* a new feature, please submit an issue with a proposal for your work first, to be sure that we can use it.

### Please consider what kind of change it is:
* For a **Major Feature**, first open an issue and outline your proposal so that it can be discussed. This will also allow us to better coordinate our efforts, prevent duplication of work, and help you to craft the change so that it is successfully accepted into the project.
* **Small Features** can be crafted and directly [submitted as a Pull Request](#submit-pr).

## Submission Guidelines

### Submitting an Issue

Before you submit an issue, please search the [issue tracker][issues], maybe an issue for your problem already exists and the discussion might inform you of workarounds readily available.

We want to fix all the issues as soon as possible, but before fixing a bug we need to reproduce and confirm it. In order to reproduce bugs, we kindly ask you to provide a reproduction scenario with a screen recording, or with detailed steps.

A reproduce scenario using a screen recording allows us to quickly confirm a bug (or point out coding problem) as well as confirm that we are fixing the right problem.

We will be insisting on a reproduce scenario in order to save maintainers time and ultimately be able to fix more bugs.

Unfortunately, we are not able to investigate / fix bugs without at least a minimal reproduction, so if we don't hear back from you we are going to close an issue that doesn't have enough info to be reproduced.

You can file new issues by filling out our [new issue form][newissue].


### Submitting a Pull Request (PR)
Before you submit your Pull Request (PR) consider the following guidelines:

1. Search [GitHub][prs] for an open or closed PR that relates to your submission. You don't want to duplicate effort.
1. Fork the **trobonox/pokaimon** repo.
1. Make your changes in a new git branch:

     ```shell
     git checkout -b my-fix-branch master
     ```

1. Create your patch, **including appropriate test cases**.
1. Follow our [Coding Rules](#rules).
1. Run a test on anything you added, and ensure that all tests pass.
1. Commit your changes using a descriptive commit message that follows our [commit message conventions](#commit).

     ```shell
     git commit -a
     ```
    Note: the optional commit `-a` command line option will automatically "add" and "rm" edited files.

1. Push your branch to GitHub:

    ```shell
    git push origin my-fix-branch
    ```

1. In GitHub, send a pull request to `pokaimon:master`.
* If we suggest changes then:
  * Make the required updates.
  * Re-run tests to ensure tests are still passing.
  * Rebase your branch and force push to your GitHub repository (this will update your Pull Request):

    ```shell
    git rebase master -i
    git push -f
    ```

That's it! Thank you for your contribution!

#### After your pull request is merged

After your pull request is merged, you can safely delete your branch and pull the changes
from the main (upstream) repository:

* Delete the remote branch on GitHub either through the GitHub web UI or your local shell as follows:

    ```shell
    git push origin --delete my-fix-branch
    ```

* Check out the master branch:

    ```shell
    git checkout master -f
    ```

* Delete the local branch:

    ```shell
    git branch -D my-fix-branch
    ```

* Update your master with the latest upstream version:

    ```shell
    git pull --ff upstream master
    ```

## <a name="rules"></a> Coding Rules
To ensure consistency throughout the source code, keep these rules in mind as you are working:

* Make sure you have ESLint and Prettier installed in your IDE.
* Format and lint your code before submitting.
* Additionally, you can install the Tailwind CSS IntelliSense plugin to help you with using Tailwind CSS.

## Commit messages
We have very precise rules over how our **git commit** messages can be formatted. This leads to more readable messages that are easy to follow when looking through the project history.

Samples: (even more [samples][commits]

```
docs(changelog): update changelog to beta.5
```
```
fix(release): need to depend on latest rxjs and zone.js

The version in our package.json gets copied to the one we publish, and users need the latest of these.
```

### Revert
If the commit reverts a previous commit, it should begin with `revert: `, followed by the header of the reverted commit. In the body it should say: `This reverts commit <hash>.`, where the hash is the SHA of the commit being reverted.

### Type
Must be one of the following:

* **build**: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
* **ci**: Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)
* **docs**: Documentation only changes
* **feat**: A new feature
* **fix**: A bug fix
* **perf**: A code change that improves performance
* **refactor**: A code change that neither fixes a bug nor adds a feature
* **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
* **test**: Adding missing tests or correcting existing tests

### Subject
The subject contains a succinct description of the change:

* use the imperative, present tense: "change" not "changed" nor "changes"
* don't capitalize the first letter
* no dot (.) at the end

[github]: https://github.com/trobonox/pokaimon
[issues]: https://github.com/trobonox/pokaimon/issues
[newissue]: https://github.com/trobonox/pokaimon/issues/new
[prs]: https://github.com/trobonox/pokaimon/pulls
[commits]: https://github.com/trobonox/pokaimon/commits/main
