import eel
eel.init("web", allowed_extensions=['html', 'css', '.js'], js_result_timeout=1000)
eel.start("index.html", size=(500, 800))