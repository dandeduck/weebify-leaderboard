FROM denoland/deno:1.12.0

# EXPOSE 1993

WORKDIR /app

# Prefer not to run as root.
USER deno
ENV PORT=8080

# Cache the dependencies as a layer (the following two steps are re-run only when deps.ts is modified).
# Ideally cache deps.ts will download and compile _all_ external files used in main.ts.
# COPY src/*.ts .
COPY src/controllers/* ./controllers/
COPY src/helpers ./helpers/
RUN deno cache deps.ts

# These steps will be re-run upon each file change in your working directory:
ADD . .
# Compile the main app so that it doesn't need to be compiled each startup/entry.
RUN deno cache service.ts

CMD ["run", "--allow-read", "--allow-env", "--allow-net", "service.ts"]