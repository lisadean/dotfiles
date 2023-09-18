# New dotfiles repo

Repository specific files for the repo are stored in `~/.dotfiles` instead of `~/.git` like they would normally be so there's less
chance of conflict. The working tree is still `$HOME`

The `git` command is replaced by a function that will run `git` commands against the bare `~/.dotfiles.git` repo when
in the home directory and run the regular git command as usual when not.

## Setup on new computer

```shell
cd ~
git clone --bare git@github.com:lisadean/newdotfiles.git $HOME/.dotfiles.git
git --git-dir=$HOME/.dotfiles.git/ --work-tree=$HOME checkout
```

Backup snippet in case there are files that would be overwritten

```shell
mkdir -p .config-backup && \
config checkout 2>&1 | egrep "\s+\." | awk {'print $1'} | \
xargs -I{} mv {} .config-backup/{}
```

[Another possible issue when cloning to new computer](https://news.ycombinator.com/item?id=11079145)

## Reference

Heavily inspired by:

- [https://www.atlassian.com/git/tutorials/dotfiles](https://www.atlassian.com/git/tutorials/dotfiles)
- [Drew Devault's dotfiles](https://drewdevault.com/2019/12/30/dotfiles.html)

Shell profile loading order: https://medium.com/@rajsek/zsh-bash-startup-files-loading-order-bashrc-zshrc-etc-e30045652f2e
