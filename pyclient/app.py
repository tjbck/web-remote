import socketio
import pyautogui
from scipy.spatial.transform import Rotation as R

# standard Python
sio = socketio.Client()

url = 'http://localhost:3000'
url = 'https://circkle.me'

room = '362'

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

@sio.on('sensor')
def absoluteOrientationSensor(data):
    r = R.from_quat([float(i) for i in data])
    euler = r.as_euler('zyx', degrees=True).tolist()
    print("\n"+ 'sensor: ' + str(euler) + "\n")

