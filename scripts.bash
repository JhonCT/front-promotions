
# * * * * * * * * * * * * * * * * * *
# comandos para los despliegues
# * * * * * * * * * * * * * * * * * *

# MAIN GATEWAY
docker rm -f deploy_wlso.main.gateway_1 \
&& docker-compose up -d --no-deps wlso.main.gateway

# GAMES
docker rm -f operator-admin-services_wlso.games_1 \
&& docker rmi $(docker images |grep 'wlso.games') \
&& docker-compose up -d --no-deps wlso.games

git pull \
&& docker rm -f operator-admin-services_wlso.games_1 \
&& docker-compose up --build -d --no-deps wlso.games

# PLAYERS
git pull \
docker rm -f operator-admin-services_wlso.players_1 \
&& docker-compose up --build -d --no-deps wlso.players

# SECURITY-CUSTOMER
git pull \
docker rm -f operator-admin-services_wlso.security.customer_1 \
&& docker-compose up --build -d --no-deps wlso.security.customer

# USERS
git pull \
docker rm -f operator-admin-services_wlso.users_1 \
&& docker-compose up --build -d --no-deps wlso.users

# WALLET
git pull \
docker rm -f operator-admin-services_wlso.wallet_1 \
&& docker-compose up --build -d --no-deps wlso.wallet

# SECURITY-ADMIN
git pull \
docker rm -f operator-admin-services_wlso.security.admin_1 \
&& docker-compose up --build -d --no-deps wlso.security.admin

