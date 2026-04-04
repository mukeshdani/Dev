# Linux Commands

# 1. Navigation Commands

## pwd

Shows current working directory.

Example:

```bash
pwd
```

## ls

Lists files and directories.

```bash
ls
ls -l
ls -a
```

## cd

Change directory.

```bash
cd /home/user
cd ..
cd ~
```

## tree

Display directory structure.

```bash
tree
```

---

# 2. File & Directory Management

## mkdir

Create directory.

```bash
mkdir project
```

## rmdir

Remove empty directory.

```bash
rmdir folder
```

## touch

Create empty file.

```bash
touch file.txt
```

## cp

Copy files.

```bash
cp file.txt backup.txt
cp -r folder backup_folder
```

## mv

Move or rename files.

```bash
mv file.txt newfile.txt
mv file.txt /home/user/
```

## rm

Remove files or directories.

```bash
rm file.txt
rm -r folder
rm -rf folder
```

## stat

Show file details.

```bash
stat file.txt
```

## file

Detect file type.

```bash
file image.png
```

---

# 3. File Viewing

## cat

Display file content.

```bash
cat file.txt
```

## less

View file page by page.

```bash
less file.txt
```

## more

Basic file viewer.

```bash
more file.txt
```

## head

Show first lines.

```bash
head file.txt
head -n 10 file.txt
```

## tail

Show last lines.

```bash
tail file.txt
tail -f log.txt
```

---

# 4. Text Processing

## grep

Search text in files.

```bash
grep "error" log.txt
grep -i "hello" file.txt
```

## cut

Extract columns from text.

```bash
cut -d ":" -f1 /etc/passwd
```

## sort

Sort lines.

```bash
sort file.txt
```

## uniq

Remove duplicate lines.

```bash
uniq file.txt
```

## wc

Count lines, words, characters.

```bash
wc file.txt
```

## awk

Pattern scanning.

```bash
awk '{print $1}' file.txt
```

## sed

Stream editor.

```bash
sed 's/linux/unix/g' file.txt
```

---

# 5. File Permissions

## chmod

Change permissions.

```bash
chmod 755 script.sh
chmod +x script.sh
```

## chown

Change file owner.

```bash
chown user file.txt
```

## chgrp

Change group.

```bash
chgrp developers file.txt
```

---

# 6. Searching Commands

## find

Search files.

```bash
find /home -name file.txt
find / -type d
```

## locate

Fast file search.

```bash
locate file.txt
```

## which

Locate command path.

```bash
which python
```

## whereis

Find command binaries.

```bash
whereis python
```

---

# 7. Disk & Storage

## df

Disk space usage.

```bash
df -h
```

## du

Directory size.

```bash
du -sh folder
```

## mount

Mount filesystem.

```bash
mount /dev/sdb1 /mnt
```

## umount

Unmount filesystem.

```bash
umount /mnt
```

## lsblk

List block devices.

```bash
lsblk
```

---

# 8. Process Management

## ps

Show processes.

```bash
ps
ps aux
```

## top

Real-time process monitor.

```bash
top
```

## htop

Enhanced top.

```bash
htop
```

## kill

Terminate process.

```bash
kill 1234
```

## killall

Kill by name.

```bash
killall firefox
```

## nice

Run process with priority.

```bash
nice -n 10 command
```

---

# 9. Networking Commands

## ping

Test connectivity.

```bash
ping google.com
```

## ifconfig

Network interface details.

```bash
ifconfig
```

## ip

Modern networking tool.

```bash
ip a
```

## netstat

Network statistics.

```bash
netstat -tuln
```

## ss

Socket statistics.

```bash
ss -tuln
```

## curl

Transfer data from URL.

```bash
curl https://example.com
```

## wget

Download files.

```bash
wget https://example.com/file.zip
```

---

# 10. Archive & Compression

## tar

Archive files.

```bash
tar -cvf archive.tar folder
tar -xvf archive.tar
```

## gzip

```bash
gzip file.txt
```

## gunzip

```bash
gunzip file.txt.gz
```

## zip

```bash
zip archive.zip file.txt
```

## unzip

```bash
unzip archive.zip
```

---

# 11. User Management

## useradd

Create user.

```bash
sudo useradd username
```

## userdel

Delete user.

```bash
sudo userdel username
```

## passwd

Change password.

```bash
passwd username
```

## who

Show logged users.

```bash
who
```

## id

User identity.

```bash
id username
```

---

# 12. Package Management (Debian/Ubuntu)

## apt update

```bash
sudo apt update
```

## apt upgrade

```bash
sudo apt upgrade
```

## apt install

```bash
sudo apt install git
```

## apt remove

```bash
sudo apt remove package
```

---

# 13. System Information

## uname

System info.

```bash
uname -a
```

## hostname

```bash
hostname
```

## uptime

```bash
uptime
```

## date

```bash
date
```

## cal

```bash
cal
```

---

# 14. Environment Variables

## echo

```bash
echo $PATH
```

## export

```bash
export VAR=value
```

## env

```bash
env
```

---

# 15. Remote Access

## ssh

```bash
ssh user@192.168.1.10
```

## scp

```bash
scp file.txt user@server:/home/user
```

## rsync

```bash
rsync -av folder user@server:/backup
```

---

# 16. Shell Utilities

## history

```bash
history
```

## alias

```bash
alias ll="ls -la"
```

## clear

```bash
clear
```

## exit

```bash
exit
```

---

# 17. Job Control

## jobs

```bash
jobs
```

## bg

```bash
bg
```

## fg

```bash
fg
```
