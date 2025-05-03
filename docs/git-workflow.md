# Git Workflow Guidelines

This document describes the branching strategy, naming conventions, and protection rules used in this repository.

---

## 🧭 Branch Structure

| Branch Name Example         | Purpose                        | Push Allowed | Pull Request Required | CI Tests |
|-----------------------------|--------------------------------|--------------|-----------------------|----------|
| `master`                    | Production code                | ❌            | ✅                     | ✅        |
| `develop`                   | Pre-release staging            | ❌            | ✅                     | ✅        |
| `feat/reset-password`       | Main feature branch            | ❌            | ✅                     | ✅        |
| `task/reset-password___ui`  | Sub-task (e.g., frontend work) | ✅            | ❌                     | local    |
| `task/reset-password___api` | Sub-task (e.g., backend work)  | ✅            | ❌                     | local    |

## 🔄 Workflow

1. **Create a main feature branch from `develop`:**
   ```bash
   git checkout develop
   git checkout -b feat/reset-password
   git push -u origin feat/reset-password
   ```
2. **Create a task branch from the feature branch:**
   ```bash
   git checkout -b task/reset-password__ui
   git push -u origin task/reset-password__ui
   ```
3. **Work locally, commit frequently and test locally**
   All your files and folders are presented as a tree in the file explorer. You can switch from one to another by clicking a file in the tree.
4. **When ready, open a Pull Request:**
    - From: `task/reset-password__ui`
    - Into: `feat/reset-password`
5. **After completing all tasks for the feature:**
    - Open a Pull Request from `feat/reset-password` to `develop`
6. After release preparation:
    - Open a Pull Request from `develop` to `master`

## 🔐 Branch Protection Rules (GitHub Settings)

| Branch Pattern | Require PR | Require CI | Prevent Push | Prevent Force Push | Prevent Deletion |
|----------------|------------|------------|--------------|--------------------|------------------|
| `master`       | ✅          | ✅          | ✅            | ✅                  | ✅                |
| `develop`      | ✅          | ✅          | ✅            | ✅                  | ✅                |
| `feat/*`       | ✅          | ✅          | ✅            | ✅                  | ✅                |
| `task/*`       | ❌          | ❌          | ❌            | ❌                  | ❌                |

*Note: Use `task/*` instead of deeper `feat/*___*` to avoid pattern collisions in branch protection.*

## 🧪 Test Strategy
- ✅ **Unit Tests**: Run locally and in CI.
- 🔄 **E2E Tests**:
  - Run locally during sub-task development.
  - Run automatically in CI on PRs to `develop` and `master`.

## 💡 Naming Conventions
- Use `feat/<feature>` for main feature branches.
- Use `task/<feature>___<score>` for sub-tasks (e.g. UI, API, auth).
- Use `fix/`, `hotfix/`, or `refactor/` as appropriate for specific purposes.

## 🚀 Summary

This workflow allows:
- Clean separation of concerns.
- Code review checkpoints.
- CI validation gates.
- Flexibility in solo development while retaining control.
<br>

<small>Guideline created on 02.05.2025, effective immediately.</small>