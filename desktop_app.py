import threading, time, socket, webview
from app import app

def get_free_port():
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        s.bind(('127.0.0.1', 0))
        return s.getsockname()[1]

def start_server(port):
    app.run(host='127.0.0.1', port=port, debug=False, use_reloader=False, threaded=True)

if __name__ == '__main__':
    port = get_free_port()
    threading.Thread(target=start_server, args=(port,), daemon=True).start()
    time.sleep(1.0)
    webview.create_window('ProSim Ultimate', f'http://127.0.0.1:{port}', width=1280, height=800)
    webview.start()
