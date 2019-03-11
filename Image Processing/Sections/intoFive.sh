#!/bin/bash

sections=(
    "BL"
    "BR"
    "BM"
    "TL"
    "TR"
    "TM"
    "ML"
    "MR"
    "MM"
)

artists=(
    "Amorsolo"
    "Cabrera"
    "Francisco"    
    "Luna"
)

augmentations=(
    ""
    "_180"
    "_clock"
    "_counter"
    "_hflip"
    "_vflip"
    "_skew"
)

folder=5
cnt=0
artistCnt=0
for i in "${sections[@]}"; do
    if [ $cnt -gt 0 ]
    then
    cd ..
    fi
    cd $i/
    artistCnt=0
    for m in ${artists[@]}; do
        if [ $artistCnt -gt 0 ]
        then
        cd ..
        fi
        cd $m$i
        for j in $( seq 1 $folder ); do
            mkdir $j
            end=$((4*$j)) 
            start=$(($end-3))
            for k in $( seq $start $end ); do
                augCnt=0
                for l in ${augmentations[@]}; do
                    if [ $augCnt -lt 1 ]
                    then
                    mv -t $j $k.jpg
                    fi
                    mv -t $j $k$l.jpg
                    augCnt=$(($augCnt+1))
                done   
            done
        done
        artistCnt=$(($artistCnt+1))
    done   
    cd ..
    cnt=$(($cnt+1))
done

