#!/bin/bash

curl -H "Content-Type: application/json" \
  --data @vote.json \
  http://localhost:62859/blob/vote
