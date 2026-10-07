# Git Commands Cheatsheet for Tsiardaka Apartment

## 📊 CHECK STATUS & INFO

### See current status
```bash
git status
```
Shows:
- Which branch you're on
- Uncommitted changes (red = unstaged, green = staged)
- Untracked files
- If you're ahead/behind remote

### See commit history
```bash
git log --oneline -10
```
Shows last 10 commits with short message. Remove `-10` to see all.

### See all branches (local + remote)
```bash
git branch -a
```
- Lines without `*` = other branches
- Line with `*` = current branch
- `remotes/origin/` = branches on GitHub

### Compare local vs remote
```bash
git status
```
Shows if local is "ahead" (unpushed commits) or "behind" (unpulled commits)

### See what changed in a file
```bash
git diff <filename>
```
Shows additions (green +) and deletions (red -) since last commit

---

## 🔄 SYNC WITH GITHUB

### Download latest from GitHub (safe, doesn't change your files)
```bash
git fetch origin
```
Updates what you know about GitHub without merging anything

### Download + merge latest (recommended for you)
```bash
git pull origin main
```
Downloads latest `main` branch and merges it into your local `main`

### Upload your changes to GitHub
```bash
git push origin main
```
Uploads your committed changes to GitHub's `main` branch

---

## ✏️ MAKE & COMMIT CHANGES

### Stage changes (prepare for commit)
```bash
git add .
```
Stages ALL changed files (`.` means "everything")

Or stage specific file:
```bash
git add <filename>
```

### Commit (save to local history with message)
```bash
git commit -m "Short description of what changed"
```

### Undo last commit (but keep changes)
```bash
git reset --soft HEAD~1
```

### Undo last commit completely (dangerous!)
```bash
git reset --hard HEAD~1
```
⚠️ This deletes the commit AND your changes. Only use if 100% sure.

---

## 🌿 WORK WITH BRANCHES

### See all branches
```bash
git branch -a
```

### Create new branch
```bash
git checkout -b <new-branch-name>
```

### Switch to existing branch
```bash
git checkout main
```
or
```bash
git switch main
```

### Delete local branch
```bash
git branch -d <branch-name>
```

### Delete remote branch
```bash
git push origin --delete <branch-name>
```

---

## 🔀 MERGE BRANCHES

### Merge another branch into current branch
```bash
git merge <other-branch>
```
Example: You're on `main`, merge feature branch:
```bash
git merge feature-xyz
```

---

## 🆘 FIX COMMON PROBLEMS

### You made changes but want to discard them
```bash
git checkout -- <filename>
```
Or discard ALL changes:
```bash
git reset --hard
```

### You committed but want to change the message
```bash
git commit --amend -m "New message"
```

### You forgot to push and made new commits
```bash
git push origin main
```
Pushes all unpushed commits at once

### You pulled but got merge conflict
```bash
# Edit the conflicted file (look for <<<< ==== >>>>)
# Fix it manually, then:
git add <filename>
git commit -m "Resolve merge conflict"
git push origin main
```

### See differences between branches
```bash
git diff main feature-xyz
```

---

## 📋 DAILY WORKFLOW FOR YOU

### Every morning:
```bash
git pull origin main
```
Get my latest changes

### After you make changes:
```bash
git status                    # See what changed
git add .                     # Stage changes
git commit -m "What changed"  # Commit
git push origin main          # Upload to GitHub
```

### Before pushing, check:
```bash
git status      # See what's staged
git log -1      # See last commit
```

---

## 🎯 USEFUL SHORTCUTS

### See short status
```bash
git status -s
```
More compact output

### See last 5 commits with details
```bash
git log --oneline -5 --graph
```

### See who changed each line in a file
```bash
git blame <filename>
```

### Create commit with detailed message
```bash
git commit
```
(Opens text editor for multi-line message)

---

## ⚠️ REMEMBER

✅ **Always `git pull` before starting work**
✅ **Commit frequently with clear messages**
✅ **Push when done so I can see your changes**
✅ **Run `git status` before push to verify**

❌ **Never force push** (`git push --force`)
❌ **Never** `git reset --hard` unless you're 100% sure
❌ **Don't work without pulling first** (causes conflicts)

---

## 🔗 Quick Reference

| Task | Command |
|------|---------|
| Check status | `git status` |
| See changes | `git diff` |
| Get latest | `git pull origin main` |
| Upload | `git push origin main` |
| Save changes | `git add . && git commit -m "msg"` |
| See history | `git log --oneline` |
| See branches | `git branch -a` |
| Switch branch | `git checkout <branch>` |
| Undo changes | `git checkout -- <file>` |

