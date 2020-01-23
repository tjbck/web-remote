import socketio
import pyautogui
from scipy.spatial.transform import Rotation as R

from keys import PressKey,ReleaseKey,X,Y,A,B,UP,DOWN,LEFT,RIGHT

# standard Python
sio = socketio.Client()
# url = 'http://localhost:3000'
url = 'https://circkle.me'

room = '928'

sio.connect(url)

print('my sid is', sio.sid)
sio.emit('join', {'room': room})

@sio.on('message')
def on_message(data):
    if(data == "quit"):
        sio.disconnect()
    else:
        print('socket: ' + data + "\n")
        pyautogui.typewrite(data)

@sio.on('pressed')
def on_pressed(data):
    print("\n"+ 'pressed: ' + str(data) + "\n")
    if(data == "x"):
        PressKey(X)
    elif(data == "y"):
        PressKey(Y)
    elif(data == "a"):
        PressKey(A)
    elif(data == "b"):
        PressKey(B)
    elif(data == "up"):
        PressKey(UP)
    elif(data == "down"):
        PressKey(DOWN)
    elif(data == "left"):
        PressKey(LEFT)
    elif(data == "right"):
        PressKey(RIGHT)


@sio.on('released')
def on_released(data):
    print("\n"+ 'released: ' + str(data) + "\n")
    if(data == "x"):
        ReleaseKey(X)
    elif(data == "y"):
        ReleaseKey(Y)
    elif(data == "a"):
        ReleaseKey(A)
    elif(data == "b"):
        ReleaseKey(B)
    elif(data == "up"):
        ReleaseKey(UP)
    elif(data == "down"):
        ReleaseKey(DOWN)
    elif(data == "left"):
        ReleaseKey(LEFT)
    elif(data == "right"):
        ReleaseKey(RIGHT)

@sio.on('sensor')
def absoluteOrientationSensor(data):
    r = R.from_quat([float(i) for i in data])
    euler = r.as_euler('zyx', degrees=True).tolist()
    print("\n"+ 'sensor: ' + str(euler) + "\n")

