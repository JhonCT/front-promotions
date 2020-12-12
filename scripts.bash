
# * * * * * * * * * * * * * * * * * *
# comandos para los despliegues
# * * * * * * * * * * * * * * * * * *

# LIVE
cd /home/assosaramos/operator-admin-app-no-wl/ \
&& git checkout master \
&& git pull \
&& git --no-pager show --summary \
&& docker image prune -f \
&& docker-compose --project-name casinovip365_ --file docker-compose.yaml build --force-rm live.ope.admin.app.no.wl \
&& docker-compose --project-name casinovip365_ --file docker-compose.yaml rm -f live.ope.admin.app.no.wl \
&& docker-compose --project-name casinovip365_ --file docker-compose.yaml up -d --no-deps live.ope.admin.app.no.wl

