FROM artifacts.int.corefiling.com:5000/labs/simple-platform-server:1.0.0
ENV APP_NAME quick-taxonomy-info
ENV STATIC_DIR /app/static
COPY www $STATIC_DIR