include ./birds/.env
export

CUR_DIR := $(shell pwd)
LOCAL_DUMP_PATH=/birds/_BACKUP

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


backup:
	@docker exec -i pgcontainer pg_dump --username $(NEXT_PUBLIC_DB_USER) $(NEXT_PUBLIC_DB_NAME) > .$(LOCAL_DUMP_PATH)/database.dump
	@echo "Backed up All! `date +%F--%H-%M`"


convertedbkp:
	@docker exec -i pgcontainer pg_dump --username $(NEXT_PUBLIC_DB_USER) $(NEXT_PUBLIC_DB_NAME) > .$(LOCAL_DUMP_PATH)/database.dump
	@sed 's/public\.//' -i .$(LOCAL_DUMP_PATH)/database.dump
	@[ -e "$(CUR_DIR)/$(LOCAL_DUMP_PATH)/output.sqlite" ] && rm "$(CUR_DIR)/$(LOCAL_DUMP_PATH)/output.sqlite" && echo "File deleted" || echo "Nothing to delete"
	@docker run --rm -v $(CUR_DIR)/$(LOCAL_DUMP_PATH):/dbdata -e psource='/dbdata/database.dump' -e starget='/dbdata/output.sqlite' -i glennpromise/pg2sqlite:1.0.1
	@echo "Backed up & converted! `date +%F--%H-%M`"


clean:
	@docker system prune -f
	@docker system prune -f --volumes


# logs:
# 	@sudo htpasswd -b .htpasswd $(ADMIN_USER) $(ADMIN_PASSW)
# 	@goaccess ./log/nginx/access.log -o ./log/report/report.html --log-format COMBINED --html-report-title "Статистика"


up:
	@sudo dnf --refresh update && sudo dnf upgrade
