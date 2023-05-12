#!/bin/bash

temp_id=$(cat /proc/sys/kernel/random/uuid)
temp_id=$(echo $temp_id | cut --delimiter='-' -f 2)

export MONGO_RANDOM_ID="fixtures-test-$temp_id"

echo "Temporary database id: $temp_id"
echo "Temporary database name: $MONGO_RANDOM_ID"
