#!/bin/bash

sections=(
    "BL"
    # "BR"
    # "BM"
    # "TL"
    # "TR"
    # "TM"
    # "ML"
    # "MR"
    # "MM"
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
    cnt=$(($cnt+1))
done

# for i in "${sections[@]}"; do
#         artistCnt=$(($artistCnt+1))
#     done   
#     cd ..
#     cnt=$(($cnt+1))
# done

#HOW BOUT INSTEAD OF MAKING LISTS, JUST ITERATE FROM 1 TO 5 except for current iteration number 
#EX if iteration 1, u make training set 2 3 4 5 test 1
# iteration 2, training set 1 3 4 5 test 2
# excluse iteration number