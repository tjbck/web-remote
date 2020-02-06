import pyautogui
import time
import random

screenWidth, screenHeight = pyautogui.size()
currentMouseX, currentMouseY = pyautogui.position()

time.sleep(1)
print('get ready')
time.sleep(2)

def randomCharSend():
    # pyautogui.typewrite('Hello world!', interval=0.01)
    alphabets = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']

    # while True:
    #     print(pyautogui.position())

    for i in range(1000):
        # pyautogui.press(alphabets[random.randint(0,len(alphabets) - 1)])
        pyautogui.typewrite(''.join([alphabets[random.randint(0,len(alphabets) - 1)] for i in range(2)]))
        pyautogui.press('enter')

def mouseClicks(number):
    for i in range(number):
        print(str(i))
        pyautogui.click()
        

if __name__ == "__main__":
    while True:
        clicks = input("how many")
        mouseClicks(int(clicks))
    # randomCharSend()
