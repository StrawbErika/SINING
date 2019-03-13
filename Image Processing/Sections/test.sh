#!/bin/bash

sections=(
    # "BL"
    # "BM"
    # "BR"
    # "ML"
    # "MM"
    "MR"
    # "TL"
    # "TR"
    # "TM"
)

artists=(
    "Amorsolo"
    "Cabrera"
    "Francisco"    
    "Luna"
)

for k in "${sections[@]}"; do
    cd $k
    mkdir CrossValidation
    for i in $( seq 1 5 ); do
        mv Tests/C$i CS$i
        cp ../test.py CS$i
        cd CS$i
        for j in "${artists[@]}"; do
            echo "--------------------------------------------" >> CS$i.txt
            echo $j$i >> CS$i.txt
            echo " " >> CS$i.txt
            aCount=0
            for file in C$i/$j$i/*; do
                output=$(python3 test.py \
--graph=save/output_graph.pb --labels=save/output_labels.txt \
--input_layer=Placeholder \
--output_layer=final_result \
--image=C$i/$j$i/"$(basename "$file")") 
                fOutput=${output:0:1}
                fArtist=${j:0:1}
                fSmolArtist=${fArtist,,}
                if [ $fSmolArtist == $fOutput ]
                then
                    aCount=$(($aCount+1))
                fi
                echo $output >> CS$i.txt
            done
            echo $aCount >> CS$i.txt
        done
        mv CS$i.txt ../CrossValidation
        rm -rf test.py
        cd ..
    done
done




