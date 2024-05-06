if [ ! "$(docker ps -a -q -f name=postgresDB)" ]; then
  if [ "$(docker ps -aq -f status=exited -f name=postgresDB)" ]; then
    docker rm postgresDB
  fi
  echo "postgres container postgresDB is not running. Starting..."
    docker run --name postgresql -itd --restart always \
    --publish 5432:5432 \
    --name postgresDB \
    --env 'DB_USER=dbuser' --env 'DB_PASS=12345678' \
    --env 'PG_PASSWORD=12345678' \
    --env 'DB_NAME=els' \
    --volume postgresql:/var/lib/postgresql \
    sameersbn/postgresql:15-20230628
    sleep 3
    docker exec -it postgresDB psql -U postgres -c "CREATE USER ahmed WITH ENCRYPTED PASSWORD '12345678';
      GRANT ALL PRIVILEGES ON DATABASE els TO ahmed;
      GRANT ALL ON SCHEMA public TO ahmed;"
else
    echo "postgres container postgresDB is already running."
fi
