# SEMVER GitFlow Guide for Our Project

This document outlines the SEMVER GitFlow process utilized in our project, ensuring a structured and consistent approach to versioning and code management. SEMVER, or Semantic Versioning, is a versioning system that uses a three-part number system for tracking changes in software, represented as MAJOR.MINOR.PATCH. This guide will walk you through how to apply SEMVER principles using GitFlow in our project.

## Understanding SEMVER

- **MAJOR version** when you make incompatible API changes,
- **MINOR version** when you add functionality in a backwards compatible manner, and
- **PATCH version** when you make backwards compatible bug fixes.

## Setting Up Your Environment

Before you start, ensure you have the following configured:

- Git installed on your machine.
- A clone of the repository on your local machine.
- Access to our project's repository on GitHub or the relevant Git platform.

## GitFlow Overview

GitFlow is a branching model designed for efficient project management and version control. It involves the use of different branches for different purposes, such as development, features, releases, and hotfixes.

### Main Branches

- **Main (or Master)**: This branch contains production-ready code.
- **Develop**: This branch contains the latest developed features ready for the next release.

### Supporting Branches

- **Feature**: Branches off from `develop` for new feature development and merges back into `develop`.
- **Release**: Branches off from `develop` for final adjustments before a release. Merges into `main` and back into `develop`.
- **Hotfix**: Branches off from `main` for urgent bug fixes and merges back into both `main` and `develop`.

## Workflow Steps

1. **Starting Development**

   - Always start from the `develop` branch.
   - Ensure `develop` is up-to-date by pulling the latest changes.

2. **Creating a Feature Branch**

   - For new features, create a new branch from `develop` using the format `feature/<feature_name>`.

3. **Developing a Feature**

   - Commit changes to your feature branch.
   - Regularly push your commits to the remote repository.

4. **Finishing a Feature**

   - Rebase your feature branch onto the latest `develop` to catch up with any changes.
   - Open a pull request (PR) from your feature branch to `develop`.
   - After review, merge the PR and delete the feature branch.

5. **Preparing a Release**

   - When `develop` has enough features for a release, create a release branch named `release/x.y.z` following SEMVER.
   - Make any necessary adjustments on this branch.

6. **Releasing**

   - Merge `release/x.y.z` into `main` and tag it with the version number.
   - Merge back any changes into `develop`.
   - Delete the release branch.

7. **Hotfixes**
   - If an urgent fix is required, create a `hotfix/x.y.z` branch from `main`.
   - After fixing, merge the hotfix branch into both `main` and `develop`.
   - Tag `main` with the updated version number.

## Best Practices

- Keep your branches short-lived.
- Regularly rebase feature branches to minimize merge conflicts.
- Use meaningful commit messages and include the issue or ticket number if applicable.
- Test thoroughly before merging into `develop` or `main`.

By following this SEMVER GitFlow guide, we can manage our project's development and releases efficiently and predictably, ensuring high-quality and stable software delivery.

## Example Workflow Simulation

Let's simulate a scenario where we are developing a new feature for our project, preparing a release, and addressing a hotfix after the release.

### Starting Development

1. Ensure you're on the `develop` branch:
   ```
   git checkout develop
   ```
2. Pull the latest changes:
   ```
   git pull origin develop
   ```

### Creating a Feature Branch

1. Let's say we're adding a new login feature. Create a new branch:
   ```
   git checkout -b feature/login
   ```

### Developing the Feature

1. Make changes in your code to add the login feature.
2. Commit your changes:
   ```
   git add .
   git commit -m "Add login feature"
   ```
3. Push your branch to the remote repository:
   ```
   git push -u origin feature/login
   ```

### Finishing the Feature

1. Rebase your feature branch onto the latest `develop`:
   ```
   git checkout feature/login
   git rebase develop
   ```
2. Open a pull request (PR) from `feature/login` to `develop`.
3. After review, merge the PR and delete the feature branch:
   ```
   git branch -d feature/login
   ```

### Preparing a Release

1. Let's prepare a release with the new login feature. Create a release branch:
   ```
   git checkout -b release/1.0.0
   ```
2. Make any necessary adjustments on this branch.

### Releasing

1. Merge `release/1.0.0` into `main`:
   ```
   git checkout main
   git merge release/1.0.0
   ```
2. Tag it with the version number:
   ```
   git tag -a 1.0.0 -m "Release 1.0.0"
   ```
3. Merge back any changes into `develop`:
   ```
   git checkout develop
   git merge release/1.0.0
   ```
4. Delete the release branch:
   ```
   git branch -d release/1.0.0
   ```

### Hotfixes

1. After the release, we discovered a critical bug. Create a `hotfix/1.0.1` branch from `main`:
   ```
   git checkout -b hotfix/1.0.1 main
   ```
2. Fix the bug and commit the changes.
3. Merge the hotfix branch into both `main` and `develop`:
   ```
   git checkout main
   git merge hotfix/1.0.1
   git tag -a 1.0.1 -m "Hotfix 1.0.1"
   git checkout develop
   git merge hotfix/1.0.1
   ```
4. Delete the hotfix branch:
   ```
   git branch -d hotfix/1.0.1
   ```

By following these steps, we've simulated adding a new feature, preparing a release, and executing a hotfix, all while adhering to the SEMVER GitFlow guide.

### Common Branch Types

- `feature/*`: Used for new features and improvements to existing features.
- `bugfix/*`: Used for fixing bugs in the application.
- `hotfix/*`: Used for critical fixes that need to be deployed immediately.
- `chore/*`: Used for tasks that do not modify the application's functionality (e.g., dependency updates).
- `refactor/*`: Used for code refactoring without changing any functionality.
- `docs/*`: Used for updates to documentation.
