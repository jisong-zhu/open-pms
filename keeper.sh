#! /bin/bash

LOG_FILE="./log/open-pms.log"
remainingTimes=10
lastRestarted=0

echo "logs for open-pms" > $LOG_FILE

start ()
{
    case $1 in
        start)
            export NODE_ENV=production
            npm i
            nohup node ./app/app.js &
            echo $! > pid
        ;;
        deb|debug)
            npm i
            node --debug ./app/app.js
            echo "Server is started..."
        ;;
        dev)
            npm i
            node ./app/app.js
            echo "Server is started..."
        ;;
        -help|*)
            echo "Params: {start|debug|dev|restart}"
            exit 1
        ;;
    esac
}

while [ $remainingTimes -gt 0 ]
do
    current=`date +%s`
    timespan=$(($current - $lastRestarted))
    echo "Timespan" $timespan
    echo `date "+%y-%m-%d %H:%M:%S` > $LOG_FILE

    if [ $timespan -le 5 ]
    then
        echo "Restarted twice in" $timespan "seconds" >> $LOG_FILE
        exit
    else
        lastRestarted=$current
        echo "Restarted, remaining times" $remainingTimes >> $LOG_FILE
        start
    fi
    remainingTimes=$(($remainingTimes - 1))
done