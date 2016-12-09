# Start with node as a base image
FROM node
# Set . as the working directory
WORKDIR .
# Copy everything from the build directory
COPY ./build .
# Run npm install for the server
RUN npm install --silent
# Set the environment variable NODE_PATH=.
ENV NODE_PATH .
# Execute run_fix.sh when a container is created
CMD ./run_fix.sh
