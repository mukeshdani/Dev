#!/bin/bash

name="AWS"
env="DEV"
Date=$(date | awk '{print $1,$2,$3}')

echo "My cloud is $name, running on $env"

echo "---------Welcome to $env environment of $name -----------"

echo "We are using $SHELL"

echo "------------------------------"

echo "We are at $HOME and todays is $Date"
