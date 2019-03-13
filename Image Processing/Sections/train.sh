#!/bin/bash

sections=(
    # "BL"
    # "BM"
    # "BR"
    # "ML"
    # "MM"
    # "MR"
    "TL"
    "TR"
    "TM"
)


cnt=0
artistCnt=0
for k in "${sections[@]}"; do
    if [ $cnt -gt 0 ]
    then
        cd ..
    fi
    cd $k
    for i in $( seq 1 5 ); do
        mkdir CS$i
        cd CS$i 
        mkdir save
        cd ..
        mv ClassSet$i CS$i
        cp ../retrain.py CS$i
    done
    cd ..
done

cnt=0
artistCnt=0
for k in "${sections[@]}"; do
    cd $k
    for i in $( seq 1 5 ); do
        cd CS$i
        sudo python3 retrain.py --image_dir ClassSet$i
        cd ..
    done
    cd ..
    cnt=$(($cnt+1))
done

