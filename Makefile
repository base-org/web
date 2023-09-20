all: web docs bridge

web:
	yarn workspace @app/web dev --port 3000

docs:
	yarn workspace @app/base-docs dev --port 3001

bridge:
	yarn workspace @app/bridge dev --port 3002

lint: lint-web lint-bridge

lint-web:
	yarn workspace @app/web lint

lint-bridge:
	yarn workspace @app/bridge lint