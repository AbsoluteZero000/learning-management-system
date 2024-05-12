FROM quay.io/wildfly/wildfly
EXPOSE 8080
RUN /opt/jboss/wildfly/bin/add-user.sh admin admin --silent

COPY server.war /opt/jboss/wildfly/standalone/deployments/
CMD ["/opt/jboss/wildfly/bin/standalone.sh", "-b", "0.0.0.0", "-bmanagement", "0.0.0.0"]
