
#!/bin/bash

touch source.csv
touch target.csv

first='source.csv'
second='target.csv'

echo "Source to target file text" > source.csv

ssconvert = "$first" "$second"

echo "sssss $ssconvert "
