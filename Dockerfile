FROM meteorhacks/meteord:onbuild

RUN groupadd -r app_group && useradd -r -g app_group app_user
RUN chown -R app_user:app_group $METEORD_DIR
USER app_user

EXPOSE 80
ENTRYPOINT bash $METEORD_DIR/run_app.sh
