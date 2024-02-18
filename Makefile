include ./birds/.env
export

# LOCAL_DUMP_PATH=./birds/_BACKUP/database_dump.sql

all: run restore clean run #test clean run


run:
	@docker-compose build
	@docker-compose up -d
	@docker ps


runner:
	@docker-compose up


start:
	@docker-compose up -d


stop:
	@docker-compose down


restore:
	@docker exec -i application1 sh -c 'echo "load database from sqlite://sql-lite-database.db" \
	"into postgresql://${NEXT_PUBLIC_DB_USER}:${NEXT_PUBLIC_DB_PASSWORD}@pgcontainer:5432/${NEXT_PUBLIC_DB_NAME}" \
	"with include drop, create tables, create indexes, reset sequences, concurrency = 1, workers=2" \
	"set work_mem to '\''16MB'\'', maintenance_work_mem to '\''512 MB'\'';" > prisma/migration.load'
	@docker exec -i application1 pgloader prisma/migration.load

# backup:
# 	@rsync -r /opt/calc-iul-main/fullstack/prisma/database.db /opt/backedupp/

# @docker exec -i pgcontainer pg_dump --column-inserts --username $(NEXT_PUBLIC_DB_USER) $(NEXT_PUBLIC_DB_NAME) > $(LOCAL_DUMP_PATH)
# @echo "Backed up All! `date +%F--%H-%M`"


# backup_data:
# 	@docker exec -i pgcontainer pg_dump --data-only --column-inserts --username $(NEXT_PUBLIC_DB_USER) $(NEXT_PUBLIC_DB_NAME) > $(LOCAL_DUMP_PATH)
# 	@echo "Backed up Data! `date +%F--%H-%M`


clean:
	@docker system prune -f
	@docker system prune -f --volumes


# logs:
# 	@sudo htpasswd -b .htpasswd $(ADMIN_USER) $(ADMIN_PASSW)
# 	@goaccess ./log/nginx/access.log -o ./log/report/report.html --log-format COMBINED --html-report-title "Статистика"


up:
	@sudo dnf --refresh update && sudo dnf upgrade
