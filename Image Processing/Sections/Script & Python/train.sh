#!/bin/bash

#USUAL (for cross validation) -------
sections=(
    #"BL"
    # "BM"
    # "BR"
    # "ML"
    # "MM"
    # "MR"
    # "TL"
    # "TR"
     "TM"
)


# cnt=0
# artistCnt=0
# for k in "${sections[@]}"; doF
#     if [ $cnt -gt 0 ]
#     then
#         cd ..
#     fi
#     cd $k
#     for i in $( seq 1 5 ); do
#         mkdir CS$i
#         cd CS$i 
#         mkdir save
#         cd ..
#         mv ClassSet$i CS$i
#         cp ../retrain.py CS$i
#     done
#     cd ..
# done


 #cnt=0
 #artistCnt=0
 #for k in "${sections[@]}"; do
   #  cd $k
   #  for i in $( seq 1 5 ); do
   #      cd CS$i
   #      sudo python3 retrain.py --image_dir ClassSet$i
   #      cd ..
   #  done
   #  cd ..
   #  cnt=$(($cnt+1))
 #done

 # --------

# I FUCKED UP -----------
# cd BL/CS2/
# sudo python3 retrain.py --image_dir ClassSet2
# cd ../../

# cd BM/CS2/
# sudo python3 retrain.py --image_dir ClassSet2
# cd ../../

# cd BR/CS2/
# sudo python3 retrain.py --image_dir ClassSet2
# cd ../../

# cd ML/CS2/
# sudo python3 retrain.py --image_dir ClassSet2
# cd ../../

# cd MM/CS1/
# sudo python3 retrain.py --image_dir ClassSet1
# cd ../../

cd MR/CS2/
sudo python3 retrain.py --image_dir ClassSet2
cd ../../

cd TL/CS2/
sudo python3 retrain.py --image_dir ClassSet2
cd ../../

cd TM/CS5/
sudo python3 retrain.py --image_dir ClassSet5
cd ../../

cd TR/CS4/
sudo python3 retrain.py --image_dir ClassSet4
cd ../../
