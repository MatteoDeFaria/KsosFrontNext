#!/usr/bin/env/ groovy
pipeline {
    agent { node { label 'pi5' } }

    environment {
        registryCredential = 'docker-hub-credentials'
        REGISTRY = 'tekmatteo/ksos-front'
        CONTAINER_NAME = 'KsosFront'
        NEXT_PUBLIC_KSOS_API_URL = credentials('ksos-api-url')
        NEXT_PUBLIC_RIOT_DRAGON_VERSION = credentials('riot-dragon-version')
    }

    stages {
        stage('Stop and clean up old latest Docker Image') {
            steps {
                script {
                    oldContainerId = sh(script: "docker ps -a -q -f name=$CONTAINER_NAME", returnStdout: true)
                    oldImageId = sh(script: "docker images -qf reference=$REGISTRY:latest", returnStdout: true)

                    if (oldContainerId != '') {
                        sh "docker stop $CONTAINER_NAME"
                        sh "docker rm $CONTAINER_NAME"
                    } else {
                        echo "No container to delete..."
                    }

                    if (oldImageId != '') {
                        sh "docker rmi $registry:latest"
                    } else {
                        echo "No image to delete..."
                    }
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                sh('docker build -t $REGISTRY:$BUILD_NUMBER -t $REGISTRY:latest --build-arg NEXT_PUBLIC_KSOS_API_URL=$NEXT_PUBLIC_KSOS_API_URL .')
            }
        }

        stage('Deploy Docker Image to DockerHub') {
            steps {
                sh('docker push $REGISTRY')
            }
        }

        stage('Clean up Docker Image') {
            steps {
                sh "docker rmi $REGISTRY:$BUILD_NUMBER"
                sh "docker rmi $REGISTRY:latest"
            }
        }

        stage('Run Docker Image') {
            steps {
                sh "docker run --name $CONTAINER_NAME --env NEXT_PUBLIC_KSOS_API_URL=$NEXT_PUBLIC_KSOS_API_URL NEXT_PUBLIC_RIOT_DRAGON_VERSION=$NEXT_RIOT_DRAGON_VERSION --restart always -p 3001:3000 -d $REGISTRY:latest"
            }
        }
    }
}