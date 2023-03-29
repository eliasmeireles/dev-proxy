docker-deploy:
	docker-compose up --build -d
	docker-compose logs -f

docker-logs:
	docker-compose logs -f
