mvn clean install package
cp  target/server.war docker/server.war
cd docker
docker build -t wildflyserver .
docker run --net backend --rm --name backendCourses -p 8080:8080 wildflyserver
