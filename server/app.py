import pyautogui
from flask import Flask, render_template
from flask_socketio import SocketIO, emit

app = Flask(__name__, static_url_path='/static')
app.config['SECRET_KEY'] = 'secret!'

socketio = SocketIO(app)

@app.route('/')
def root():
    return app.send_static_file('index.html')

@app.route('/<path:path>')
def static_proxy(path):
  # send_static_file will guess the correct MIME type
  return app.send_static_file(path)

@socketio.on('sensor')
def absoluteOrientationSensor(data):
    print("\n"+ 'sensor: ' + str(data) + "\n\n")

@socketio.on('keyboard')
def test_message(message):
    print("\n\n"+ 'socket: ' + message + "\n")
    # emit('a', message)
    # pyautogui.press('a')
    pyautogui.typewrite(message)

if __name__ == '__main__':
    socketio.run(app,host='0.0.0.0', port=443, debug=True, ssl_context='adhoc')
