#!/usr/bin/env sh

##############################################################################
##                                                                          ##
##  Gradle start up script for UN*X                                         ##
##                                                                          ##
##############################################################################

# Add default JVM options here. You can also use JAVA_OPTS and GRADLE_OPTS to pass JVM options to this script.
DEFAULT_JVM_OPTS="-Xmx64m -Xms64m"

APP_BASE_NAME=`basename "$0"`
APP_HOME=`dirname "$0"`

# Resolve APP_HOME to an absolute path
APP_HOME=`cd "$APP_HOME" > /dev/null && pwd`

# Find java
if [ -n "$JAVA_HOME" ] ; then
    JAVACMD="$JAVA_HOME/bin/java"
else
    JAVACMD="java"
fi

# Verify java exists
if [ ! -x "$JAVACMD" ] ; then
    echo "ERROR: JAVA_HOME is not set and no 'java' command could be found in your PATH." 1>&2
    exit 1
fi

# Execute Gradle wrapper
exec "$JAVACMD" $DEFAULT_JVM_OPTS -cp "$APP_HOME/gradle/wrapper/gradle-wrapper.jar" org.gradle.wrapper.GradleWrapperMain "$@"

