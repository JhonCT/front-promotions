# * * * * * * * * * * * * * * * * * *
# comandos para los despliegues
# * * * * * * * * * * * * * * * * * *

# UAT
cd /home/assosaramos/operator-admin-app-no-wl/ \
&& git checkout uat \
&& git pull \
&& git --no-pager show --summary \
&& docker image prune -f \
&& docker-compose --project-name casinovip365_ --file docker-compose.uat.yaml build --force-rm uat.ope.shop.desktop \
&& docker-compose --project-name casinovip365_ --file docker-compose.uat.yaml rm -f uat.ope.shop.desktop \
&& docker-compose --project-name casinovip365_ --file docker-compose.uat.yaml up -d --no-deps uat.ope.shop.desktop

