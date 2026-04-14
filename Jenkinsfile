pipeline {
    agent any

    environment {
        SUPABASE_URL = credentials('supabase-url')
        SUPABASE_KEY = credentials('supabase-key')
    }

    stages {

        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/merakirebar/test.git'
            }
        }

        // ✅ CREATE ENV FIRST
        stage('Setup Env') {
            steps {
                sh '''
                echo "SUPABASE_URL=$SUPABASE_URL" > .env
                echo "SUPABASE_KEY=$SUPABASE_KEY" >> .env
                '''
            }
        }

        stage('Build') {
            steps {
                sh 'docker-compose build'
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                docker-compose down
                docker-compose up -d
                '''
            }
        }
    }
}
