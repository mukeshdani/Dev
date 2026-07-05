#!/bin/bash 

Date=$(date)
uptime=$(uptime)
currentlyConnectedUsers=$(w)

echo "Please let me know how many last users do you want to see"
read LastLogin
lastUser=$(last -n $LastLogin)

echo "Todays Date is: $(Date)"
echo "--------------------------------------------------------"
echo "--------------------------------------------------------"
echo "Uptime: "
echo $uptime
echo "--------------------------------------------------------"
echo "--------------------------------------------------------"
echo "Current Connected Users: "
echo $currentlyConnectedUsers
echo "--------------------------------------------------------"
echo "--------------------------------------------------------"
echo "Last $LastLogin Login Users: "
echo $lastUser
echo "--------------------------------------------------------"
echo "--------------------------------------------------------"
echo "Disk usage: " && df -h | xargs | awk '{print "Free/total disk: " $11 "/" $9 }'
echo "Memory usage: " && free -h | xargs | awk '{print "Free/total Memory: " $10 "/" $8 }'


