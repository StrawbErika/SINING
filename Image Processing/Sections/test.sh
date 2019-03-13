#!/bin/bash

sections=(
    # "BL"
    "BM"
    "BR"
    # "ML"
    # "MM"
    # "MR"
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
    for i in $( seq 1 5 ); do
        mv Tests/C$i CS$i
        cp ../test.py CS$i
        cd CS$i
        for j in "${artists[@]}"; do
            echo "--------------------------------------------" >> CS$i.txt
            echo $j$i >> CS$i.txt
            echo " " >> CS$i.txt
            for file in C$i/$j$i/*; do
                python3 test.py \
--graph=save/output_graph.pb --labels=save/output_labels.txt \
--input_layer=Placeholder \
--output_layer=final_result \
--image=C$i/$j$i/"$(basename "$file")" >> CS$i.txt
            done
        done
        cd ..

    done
done





# python3 test.py \
# --image=flower_photos/daisy/21652746_cc379e0eea_m.jpg