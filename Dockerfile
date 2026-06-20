FROM jenkins/jenkins:lts

USER root

# Docker CLI 설치에 필요한 패키지
RUN apt-get update && apt-get install -y \
    ca-certificates \
    curl \
    gnupg \
    lsb-release

# Docker 공식 GPG 키 및 저장소 등록
RUN install -m 0755 -d /etc/apt/keyrings && \
    curl -fsSL https://download.docker.com/linux/debian/gpg | gpg --dearmor -o /etc/apt/keyrings/docker.gpg && \
    chmod a+r /etc/apt/keyrings/docker.gpg

RUN echo \
    "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/debian \
    $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null

# Docker CLI만 설치 (데몬은 호스트의 것을 사용)
RUN apt-get update && apt-get install -y docker-ce-cli docker-compose-plugin

# Node.js 설치 (LTS, 버전은 필요에 맞게 조정)
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && \
    apt-get install -y nodejs

# jenkins 유저가 docker 소켓에 접근할 수 있도록 docker 그룹에 추가
# 호스트의 docker.sock GID와 맞춰야 하므로 docker-compose에서 group_add로 처리 권장
RUN groupadd -f docker && usermod -aG docker jenkins

USER jenkins