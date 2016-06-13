# Gotta protect passwords :O
sed -i s/@@MGU/"${MGU}"/ docker-compose.yml
sed -i s/@@MGP/"${MGP}"/ docker-compose.yml
