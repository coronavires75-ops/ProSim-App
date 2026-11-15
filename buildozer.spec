[app]
title = ProSim Ultimate
package.name = prosimultimate
package.domain = org.prosim.isis
source.dir = .
source.include_exts = py,png,jpg,kv,atlas,html,css,js,svg,webmanifest,json
version = 1.0.0
requirements = python3,kivy==2.3.0,flask,werkzeug,jinja2,itsdangerous,click,markupsafe,numpy==1.26.4
orientation = all
fullscreen = 0
android.permissions = INTERNET
android.api = 33
android.minapi = 21
android.archs = arm64-v8a
android.allow_backup = True

[buildozer]
log_level = 2
warn_on_root = 1
p4a.branch = develop
