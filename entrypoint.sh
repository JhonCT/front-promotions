#!/bin/bash

variables=(
'ENV_SECURITY_API_URL'
'ENV_PLAYERS_API_URL'
'ENV_USERS_API_URL'
'ENV_WALLET_API_URL'
'ENV_MULTILANGS_API_URL'
'ENV_REPORT_API_URL'
)

for v in ${variables[@]}; do
  echo $v
  for f in $(grep -r $v /usr/share/nginx/html | cut -d':' -f1); do
    echo "$f ==> $v ==> ${!v}"
    sed -i "s|$v|${!v}|g" $f
  done
done

nginx-debug -g "daemon off;"

