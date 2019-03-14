#!/bin/bash

sections=(
    # "BL"
    # "BM"
    # "BR"
    # "ML"
    # "MM"
    # "MR"
    # "TL"
    # "TR"
    "TM"
)

artists=(
    "Amorsolo"
    "Cabrera"
    "Francisco"    
    "Luna"
)

cnt=0
artistCnt=0
for k in "${sections[@]}"; do
    if [ $cnt -gt 0 ]
    then
        cd ..
    fi
    cd $k/
    for m in ${artists[@]}; do
        if [ $artistCnt -gt 0 ]
        then
            cd ..
        fi
        cd $m$k
        for i in $( seq 1 5 ); do
            mkdir C$i
            cd C$i
            mkdir $m
            mkdir $m$i
            cd ..
            for j in $( seq 1 5 ); do
                if [ $i -ne $j ]
                then
                    for file in $j/*; do
                        cp $j/"$(basename "$file")" C$i/$m
                    done
                else
                    for file in $j/*; do
                        cp $j/"$(basename "$file")" C$i/$m$i
                    done
                fi    
            done 
        done
        for n in $( seq 1 5 ); do
            rm -rf $n
        done
        artistCnt=$(($artistCnt+1))
    done
    cd ..
    mkdir Tests 
    for o in $( seq 1 5 ); do
        mkdir ClassSet$o
        cd Tests
        mkdir C$o
        cd ..
        for p in ${artists[@]}; do
            mv $p$k/C$o/$p ClassSet$o
            mv $p$k/C$o/$p$o Tests/C$o
            artistCnt=$(($artistCnt+1))
        done
    done
    for q in ${artists[@]}; do
        rm -rf $q$k
    done

    cnt=$(($cnt+1))
done
