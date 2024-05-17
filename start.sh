docker network create backend

docker run --net backend --rm --name backendCourses -p 8080:8080 wildflyserver &
docker run --net backend -p 5000:5000 user &
docker run -p 3000:3000 frontend  &

