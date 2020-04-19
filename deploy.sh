#!/bin/bash -e

if [ -z "$(git status --untracked-files=no --porcelain)" ]; then
  version=`yarn version --patch | awk '/New version:/ {print $4}'`
  echo "Version incremented to ${version}"
  yarn build
  silent=`git push origin`
  silent=`git push origin --tags`
  firebase deploy
else
  echo 'Commit and push changes before deploy!'
fi
