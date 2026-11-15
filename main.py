import threading, time, socket
from app import app

def get_free_port():
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        s.bind(('127.0.0.1', 0))
        return s.getsockname()[1]

def run_flask(port):
    app.run(host='127.0.0.1', port=port, debug=False, use_reloader=False, threaded=True)

if __name__ == '__main__':
    port = get_free_port()
    threading.Thread(target=run_flask, args=(port,), daemon=True).start()
    time.sleep(1.2)
    url = f'http://127.0.0.1:{port}'
    try:
        from kivy.app import App
        from kivy.uix.widget import Widget
        from kivy.clock import Clock
        import webbrowser
        class ProSimMobileApp(App):
            def build(self):
                Clock.schedule_once(lambda dt: webbrowser.open(url), 0.5)
                return Widget()
        ProSimMobileApp().run()
    except Exception:
        while True:
            time.sleep(1)
