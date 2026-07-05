#!/bin/bash

echo "Enter the file name"

read filename

if [ -f $filename  ]
then 
	echo "file name $filename exixt"

else 
	echo "file name $filename doest't exit"

fi
