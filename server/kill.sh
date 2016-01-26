#!/bin/bash

PID=$(cat ble.pid)

kill -2 $PID
echo Killed node by PID: $PID
