all:
	make web & make docs & make bridge

web:
	yarn workspace @app/web dev --port 3000

docs:
	yarn workspace @app/docs start --port 3001

bridge:
	yarn workspace @app/bridge dev --port 3002
