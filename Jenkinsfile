pipeline {
    agent any

    stages {
        stage('Check Environment') {
            steps {
                sh '''
                    echo ===== Environment =====
                    pwd
                    ls -al
                    echo ===== Node =====
                    node -v
                    echo ===== Docker =====
                    docker -v
                '''
            }
        }

        stage('Install Frontend') {
            steps {
                dir('frontend') {
                    sh 'npm ci'
                }
            }
        }

        stage('Build Frontend') {
            steps {
                dir('frontend') {
                    sh 'npm run build'
                }
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                    docker compose down
                    docker compose build
                    docker compose up -d
                '''
            }
        }

        stage('Check Containers') {
            steps {
                sh 'docker ps -a'
            }
        }
    }

    post {
        always {
            echo '========================'
            echo '배포 결과 확인'
            echo '========================'
            sh '''
                docker ps -a || true
                docker images || true
            '''
        }
        failure {
            echo '배포 실패'
        }
        success {
            echo '배포 성공'
        }
    }
}