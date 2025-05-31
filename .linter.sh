#!/bin/bash
cd /home/kavia/workspace/code-generation/piggysmart-25445-29a9ecf7/piggy_smart
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

