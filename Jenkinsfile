@Library('ised-cicd-lib') _

pipeline {
    agent {
        label '!container-utils'
    }

    options {
        disableConcurrentBuilds()
    }

    environment {
        // GLobal Vars
        BACKEND_IMAGE_NAME = "dsd-italent-backend"
        FRONTEND_IMAGE_NAME = "dsd-italent-frontend"
        BACKEND_DIR = "services/backend"
        FRONTEND_DIR = "services/frontend-v3"
        NODE_ENV = "production"
    }

    stages {
        /*
        stage('build-backend') {
            steps {
			    dir("${BACKEND_DIR}") {
                    script {
                        builder.buildApp(BACKEND_IMAGE_NAME)
                    }
                }
            }
        }
        */
        stage('build-frontend') {
            steps {
			    //dir("${FRONTEND_DIR}") {
                    script {
                        sh"""
                            pwd
                            ls -la $WORKSPACE/$FRONTEND_DIR
                        """
                        builder.buildApp(FRONTEND_IMAGE_NAME, "$WORKSPACE/$FRONTEND_DIR/**")
                    }
                //}
            }
        }
    }
}
