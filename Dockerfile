FROM openjdk:19-slim-buster

# Use alternative debian mirror
RUN sed -i -e 's/deb.debian.org/mirrors.ustc.edu.cn/g' /etc/apt/sources.list

# System packages
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
        wget \
        unzip \
        curl \
        git \
        build-essential \
        ca-certificates \
    && rm -rf /var/lib/apt/lists/*

# Node.js setup
ENV NODE_VERSION=20.x
RUN curl -fsSL https://deb.nodesource.com/setup_${NODE_VERSION} | bash - && \
    apt-get update && \
    apt-get install -y nodejs && \
    npm install -g npm@10.2.4 && \
    npm install -g react-native-cli && \
    rm -rf /var/lib/apt/lists/*

# Android SDK configuration
ENV ANDROID_HOME=/opt/android-sdk
ENV ANDROID_SDK_ROOT=/opt/android-sdk
ENV PATH=${PATH}:${ANDROID_HOME}/cmdline-tools/latest/bin:${ANDROID_HOME}/platform-tools
ENV JAVA_HOME=/usr/local/openjdk-19

# Install Android SDK tools
RUN mkdir -p ${ANDROID_HOME} && \
    cd ${ANDROID_HOME} && \
    wget -q https://dl.google.com/android/repository/commandlinetools-linux-8512546_latest.zip && \
    unzip -q commandlinetools-linux-8512546_latest.zip && \
    mkdir -p cmdline-tools/latest && \
    mv cmdline-tools/* cmdline-tools/latest/ 2>/dev/null || true && \
    rm commandlinetools-linux-8512546_latest.zip

# WearOS SDK packages
RUN yes | sdkmanager --licenses && \
    sdkmanager --update && \
    sdkmanager \
        "platform-tools" \
        "platforms;android-33" \
        "build-tools;33.0.2" \
        "system-images;android-33;google_apis;x86_64"

WORKDIR /app

# Project setup
COPY package*.json ./
RUN npm install

COPY . .

# Build configuration
ENV GRADLE_OPTS="-Dorg.gradle.daemon=false -Dorg.gradle.jvmargs=-Xmx4096m"

# Build app
RUN cd android && \
    chmod +x gradlew && \
    ./gradlew assembleDebug --no-daemon

CMD ["npm", "start"]