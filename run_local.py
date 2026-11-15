"""Run ProSim locally for offline use on the current device."""
from app import app

if __name__ == "__main__":
    print("ProSim Ultimate local server: http://127.0.0.1:5000")
    print("Keep this window open while using the app.")
    app.run(host="127.0.0.1", port=5000, debug=False, threaded=True)
