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


augmentations=(
    ""
    "_180"
    "_clock"
    "_counter"
    "_hflip"
    "_vflip"
)


folder=5
for i in "${sections[@]}"; do
    echo "cd" "$i""/"
    for j in $( seq 1 $folder ); do
        echo "mkdir" "$j"
        end=$((4*$j)) 
        start=$(($end-3))
        for k in $( seq $start $end ); do
            for l in "${augmentations[@]}"; do
                echo "$k""$l"".jpg"
            done   
        done
    done
done
