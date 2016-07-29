#!/bin/bash

curl -H "Content-Type: application/json" \
  --data @blob.json \
  http://localhost:62859/blob/create
