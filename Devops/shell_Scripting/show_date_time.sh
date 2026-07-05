
#!/bin/bash

echo "the date is: $(date | awk '{print $1,$2,$3}')"

echo "the time is: $(date | awk '{print $4}')"

echo "the time zone is: $(date | awk '{print $5}')"

echo "the year is: $(date | awk '{print $6}')"

echo "Bye bye"

echo
echo

echo "Hi Hi"

