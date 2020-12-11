
# * * * * * * * * * * * * * * * * * *
# comandos para los despliegues
# * * * * * * * * * * * * * * * * * *

# DEV
cd /home/assosaramos/operator-admin-app-no-wl/ \
&& git checkout dev \
&& git pull \
&& git --no-pager show --summary \
&& docker image prune -f \
&& docker-compose --project-name casinovip365_ --file docker-compose.dev.yaml build --force-rm dev.ope.shop.desktop \
&& docker-compose --project-name casinovip365_ --file docker-compose.dev.yaml rm -f dev.ope.shop.desktop \
&& docker-compose --project-name casinovip365_ --file docker-compose.dev.yaml up -d --no-deps dev.ope.shop.desktop
