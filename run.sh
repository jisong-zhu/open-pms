#! /bin/sh

PORT=5050


# stop()
# {
#     if [ -f pid ]
#     then
#         kill `cat pid` &
#         wait $!
#         rm pid
#     else
#         echo "PID file is not existed, maybe program is stopped ..."
#     fi
# }

stop()
{
    if [ -f pid ]
    then
        kill `cat pid` &
        wait $!
        rm pid
        echo "Server is stopped..."
    else
        echo "PID file is not existed, maybe program is stopped ..."
    fi
}

SHELL=./keeper.sh
if [ -f pid ]
then
    echo "pid file is existed, maybe program is running ..., STOP now"
    ./stop.sh
fi
if [ -f $SHELL ]
then
    $SHELL &
    echo $! > pid
else
    echo "ERROR:Cannot find $SHELL script file."
fi

case $1 in
    start)
        export NODE_ENV=production
        $SHELL $1
        echo "Server is started..."
    ;;
    restart)
        stop

        $SHELL $1
        echo "Restart successfully.."
    ;;
    deb|debug)
        $SHELL $1
        echo "Server is started..."
    ;;
    dev)
        $SHELL $1
        echo "Server is started..."
    ;;
    stop)
        stop
    ;;
    build)
        
    ;;
    version)
        
    ;;
    -help|*)
        echo "Params: {start|debug|dev|restart|stop|build|version}"
        exit 1
    ;;
esac