
# * * * * * * * * * * * * * * * * * *
# comandos para los despliegues
# * * * * * * * * * * * * * * * * * *

# MAIN
docker rm -f operator-admin-app-no-wl_wlso.dev.operator.admin.app.no.wl_1 \
&& docker-compose up  --build -d --no-deps wlso.dev.operator.admin.app.no.wl

