curl localhost:8888/.netlify/functions/tasks-update \
     --header "Content-Type: application/json" \
     --request POST \
     --data '{ "id": "283464500806418949", "name": "New name" }' \
     -v
