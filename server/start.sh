mvn package
cp  target/server-1.0-SNAPSHOT.war docker/server.war
cd docker
docker build -t wildflyserver .
docker run -p 8080:8080 -v $(pwd)/:/app -p 9990:9990 wildflyserver
