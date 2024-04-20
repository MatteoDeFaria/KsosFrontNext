#!/usr/bin/env/ groovy
pipeline {
    agent any

    environment {
        registryCredential = 'docker-hub-credentials'
        REGISTRY = 'tekmatteo/ksos-front'
        CONTAINER_NAME = 'KsosFront'
        KSOS_API = credentials('ksos-api')
    }

    stages {
        stage('Build Docker Image') {
            steps {
                script {
                    dockerImage = docker.build "$REGISTRY:$BUILD_NUMBER"
                }
            }
        }

        stage('Deploy Docker Image to DockerHub') {
            steps {
                script {
                    docker.withRegistry('', registryCredential) {
                        dockerImage.push()
                        dockerImage.push('latest')
                    }
                }
            }
        }

        stage('Clean up Docker Image') {
            steps {
                sh "docker rmi $REGISTRY:$BUILD_NUMBER"
                sh "docker rmi $REGISTRY:latest"
            }
        }

        stage('Stop and clean up old latest Docker Image') {
            agent { node { label 'pi5' } }

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

        stage('Run Docker Image') {
            agent { node { label 'pi5' } }

            steps {
                sh "docker run --name $CONTAINER_NAME --restart always --env KSOS_API=$KSOS_API -p 3001:3000 -d $REGISTRY:latest"
            }
        }
    }
}