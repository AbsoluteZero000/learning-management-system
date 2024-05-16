sudo npm run build 
docker build -t frontend .
docker run -p 3000:3000 frontend
