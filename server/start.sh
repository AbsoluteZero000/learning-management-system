mvn clean install package
cp  target/server.war docker/server.war
cd docker
docker build -t wildflyserver .
docker run -p 8080:8080 -v $(pwd)/:/app -p 9990:9990 wildflyserver
