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
	w, h= image.shape
	_, src = cv2.threshold(image, 170, 255, cv2.THRESH_BINARY_INV)

	dilate = dilation(10,src)

	colored = cv2.imread(name, 1)
	untouched = cv2.imread(name, 1)

	threshold = 180
	result, contours, hierarchy = cv2.findContours(dilate, cv2.RETR_TREE, cv2.CHAIN_APPROX_NONE)

	maxArea = -1
	for i in range(len(contours)):
		if(cv2.contourArea(contours[i]) > maxArea):
			maxArea = cv2.contourArea(contours[i])
			peri = cv2.arcLength(contours[i], True)
			rect = cv2.approxPolyDP(contours[i], 0.0667 * peri, True)
			color = (255,0,0)
			untouched = cv2.drawContours(untouched, [contours[i]], -1, color ,3)

	coordinates = findCoordinates(rect)
	cropped = colored[coordinates[0]:coordinates[1], coordinates[2]:coordinates[3]]
	return cropped

def checkSize(width,height):
	size = width
	bigger = height
	if(width > height):
		size = height
		bigger = width
	return size, bigger
	
def cropSquareImage(croppedPainting):
	w, h = croppedPainting.shape[:2]
	size, bigger = checkSize(w,h)
	biggerMid = round(bigger/2)
	middle = round(size/2)
	if(w > h):
		square = croppedPainting[biggerMid-middle:biggerMid+middle, 0:size]
	else:
		square = croppedPainting[0:size, biggerMid-middle:biggerMid+middle]
	width, height = square.shape[:2]

	return square

def rotate(image, degree):
	num_rows, num_cols = image.shape[:2]

	rotation_matrix = cv2.getRotationMatrix2D((num_cols/2, num_rows/2), degree, 1)
	rotation = cv2.warpAffine(image, rotation_matrix, (num_cols, num_rows))
	return rotation

painting = cropImage("try.jpg")
square = cropSquareImage(painting)
square = cv2.resize(square, (250, 250)) 

cv2.imwrite("vFlip.jpg", cv2.flip(square, 0))
cv2.imwrite("hFlip.jpg", cv2.flip(square, 1))
cv2.imwrite("counter.jpg", rotate(square, 90))
cv2.imwrite("clock.jpg", rotate(square, -90))
cv2.imwrite("square.jpg", square)
cv2.imwrite("cropped.jpg",painting)

cv2.waitKey(0)
cv2.destroyAllWindows()

