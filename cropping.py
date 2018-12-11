import cv2
import numpy as np 
def erosion(erosion_size, src):
	kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (erosion_size*2+1, erosion_size*2+1))
	erosion_output = cv2.erode(src, kernel)
	return erosion_output

def dilation(dilation_size, src):
	kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (dilation_size*2, dilation_size*2))
	dilation_output = cv2.dilate(src, kernel)
	return dilation_output

image = cv2.imread("try.jpg", 0)

_, src = cv2.threshold(image, 170, 255, cv2.THRESH_BINARY_INV)
dilate = dilation(10,src)
erode = erosion(9,dilate)
colored = cv2.imread("try.jpg", 1)
untouched = cv2.imread("try.jpg", 1)

ret, labels, stats, centroids = cv2.connectedComponentsWithStats(erode, 8) 

coin_count = [0, 0, 0, 0, 0]
output = []
i = 1
money = 0
while(i<ret):
	colored[stats[i][cv2.CC_STAT_TOP]:stats[i][cv2.CC_STAT_HEIGHT] + stats[i][cv2.CC_STAT_TOP],[stats[i][cv2.CC_STAT_LEFT]]] = [0,0,255] # left
	colored[[stats[i][cv2.CC_STAT_TOP]], stats[i][cv2.CC_STAT_LEFT]:stats[i][cv2.CC_STAT_LEFT] + stats[i][cv2.CC_STAT_WIDTH]] = [0,0,255] # top
	colored[stats[i][cv2.CC_STAT_TOP] + stats[i][cv2.CC_STAT_HEIGHT], stats[i][cv2.CC_STAT_LEFT] : stats[i][cv2.CC_STAT_LEFT] + stats[i][cv2.CC_STAT_WIDTH]] = [0,0,255]
	colored[stats[i][cv2.CC_STAT_TOP] : stats[i][cv2.CC_STAT_TOP] + stats[i][cv2.CC_STAT_HEIGHT], stats[i][cv2.CC_STAT_LEFT] + stats[i][cv2.CC_STAT_WIDTH]] = [0,0,255]
	i = i + 1

threshold = 180
edges = cv2.Canny(erode, threshold, 2*threshold, 3)
result, contours, hierarchy = cv2.findContours(edges, cv2.RETR_TREE, cv2.CHAIN_APPROX_NONE)

maxArea = -1
for i in range(len(contours)):
	if(cv2.contourArea(contours[i]) > maxArea):
		maxArea = cv2.contourArea(contours[i])
		color = tuple([int(x) for x in np.random.randint(0,256,3,dtype='uint8')])
		image = cv2.drawContours(image, [contours[i]], -1, color ,3)
		untouched = cv2.drawContours(untouched, [contours[i]], -1, color ,3)

	
img_name = "output.jpg"
cv2.imwrite(img_name,untouched)


cv2.imshow("with box", untouched)
cv2.imshow("with ", erode)
cv2.imshow("with/o box", colored)

cv2.waitKey(0)
cv2.destroyAllWindows()


# dilate more?  find contour and mark the biggest contour 