import cv2
import numpy as np 

def findCoordinates(rect):
    n=0
    xval=[]
    yval=[]
    while(n!=len(rect)):
        xval.append(rect[n][0][0])
        yval.append(rect[n][0][1])
        n = n + 1
    xval.sort()        
    yval.sort()
    fcoord = [yval[0], yval[len(yval)-1], xval[0], xval[len(xval)-1]]        
    return fcoord

def erosion(erosion_size, src):
	kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (erosion_size*2+1, erosion_size*2+1))
	erosion_output = cv2.erode(src, kernel)
	return erosion_output

def dilation(dilation_size, src):
	kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (dilation_size*2, dilation_size*2))
	dilation_output = cv2.dilate(src, kernel)
	return dilation_output

def cropImage(name):
	image = cv2.imread(name, 0)
	width, height = image.shape[:2]

	_, src = cv2.threshold(image, 170, 255, cv2.THRESH_BINARY_INV)
	dilate = dilation(10,src)
	erode = erosion(9,dilate)
	colored = cv2.imread(name, 1)
	untouched = cv2.imread(name, 1)

	threshold = 180
	edges = cv2.Canny(erode, threshold, 2*threshold, 3)
	result, contours, hierarchy = cv2.findContours(edges, cv2.RETR_TREE, cv2.CHAIN_APPROX_NONE)

	maxArea = -1
	for i in range(len(contours)):
		if(cv2.contourArea(contours[i]) > maxArea):
			maxArea = cv2.contourArea(contours[i])
			peri = cv2.arcLength(contours[i], True)
			rect = cv2.approxPolyDP(contours[i], 0.0667 * peri, True)
			if len(rect) == 4:
				color = (255,255,255)
				untouched = cv2.drawContours(untouched, [contours[i]], -1, color ,3)

	coordinates = findCoordinates(rect)
	cropped = colored[coordinates[0]:coordinates[1], coordinates[2]:coordinates[3]]
	return cropped
	
def cropSquareImage(croppedPainting):
	width, height = croppedPainting.shape[:2]
	if(width>height): 
		size = height
		biggerMid = round(width/2)
	else: 
		size = width
		biggerMid = round(height/2)

	middle = round(size/2)
	square = croppedPainting[0:size, biggerMid-middle:biggerMid+middle]
	width, height = square.shape[:2]

	cv2.imwrite("square.jpg", square)
	
	#can be off by 1 px (the ratio)
	#essentially current square = ... is assuming that the bigger is width, so need to be more dynamic to size

painting = cropImage("try.jpg")
cropSquareImage(painting)
img_name = "output.jpg"
cv2.imwrite(img_name,painting)

cv2.waitKey(0)
cv2.destroyAllWindows()
