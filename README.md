#

LOCAL_DUMP_PATH=./birds/_BACKUP/database_dump.sql

sudo docker run -v /opt/dbdata:/dbdata -e psource='./birds/_BACKUP/database_dump.sql/database_dump.sql' -e starget='./birds/_BACKUP/database_dump.sql/DB.sqlite' -it glennpromise/pg2sqlite:1.0.1

LOCAL_DUMP_PATH=./birds/_BACKUP/database_dump.sql

@docker exec -i pgcontainer pg_dump --username $(NEXT_PUBLIC_DB_USER) $(NEXT_PUBLIC_DB_NAME) > $(LOCAL_DUMP_PATH)

sed 's/public\.//' -i  /opt/my-boiler/birds/_BACKUP/database_dump.sql


docker run -v /opt/my-boiler/birds/_BACKUP:/dbdata -e psource='/dbdata/database.dump' -e starget='/dbdata/output.sqlite' -it glennpromise/pg2sqlite:1.0.1
