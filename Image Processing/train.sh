cp retrain.py Sections/BL 
cd Sections/BL
mkdir BLTrain
mv -t BLTrain AmorsoloBL FranciscoBL CabreraBL LunaBL
python3 retrain.py --image_dir BLTrain