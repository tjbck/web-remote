from flask import Flask, render_template
from flask_socketio import SocketIO, emit

from scipy.spatial.transform import Rotation as R
import math

app = Flask(__name__, static_url_path='/static')
app.config['SECRET_KEY'] = 'secret!'

import logging
log = logging.getLogger('werkzeug')
log.setLevel(logging.ERROR)
socketio = SocketIO(app)

def quaternion_to_euler(quat):
    t0 = +2.0 * (quat[3] * quat[0] + quat[1] * quat[2])
    t1 = +1.0 - 2.0 * (quat[0] * quat[0] + quat[1] * quat[1])
    roll = math.atan2(t0, t1)
    t2 = +2.0 * (quat[3] * quat[1] - quat[2] * quat[0])
    t2 = +1.0 if t2 > +1.0 else t2
    t2 = -1.0 if t2 < -1.0 else t2
    pitch = math.asin(t2)
    t3 = +2.0 * (quat[3] * quat[2] + quat[0] * quat[1])
    t4 = +1.0 - 2.0 * (quat[1] * quat[1] + quat[2] * quat[2])
    yaw = math.atan2(t3, t4)
    return [yaw, pitch, roll]

@app.route('/')
def root():
    return app.send_static_file('index.html')

@app.route('/<path:path>')
def static_proxy(path):
  # send_static_file will guess the correct MIME type
  return app.send_static_file(path)

@socketio.on('sensor')
def absoluteOrientationSensor(data):
    euler = quaternion_to_euler([float(i) for i in data])
    euler = [math.degrees(i) for i in euler]
    print("\n"+ 'sensor: ' + str(euler))

    r = R.from_quat([float(i) for i in data])
    euler = r.as_euler('zyx', degrees=True).tolist()
    print("\n"+ 'sensor: ' + str(euler) + "\n")

@socketio.on('keyboard')
def test_message(message):
    print("\n"+ 'socket: ' + message + "\n")

if __name__ == '__main__':
    # socketio.run(app,host='0.0.0.0', port=443, debug=True, ssl_context='adhoc')
    socketio.run(app,host='0.0.0.0', port=3000, debug=True)

