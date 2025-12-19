pipeline {
  agent {
    docker {
      image 'node:18-alpine'
      args '--user root'
    }
  }
  
  stages {
    stage('Clone & Setup') {
      steps {
        git branch: 'main', url: 'https://github.com/MedAmine02/tp2_jenkins_pipeline_angular'
        sh 'npm install'
      }
    }
    
    stage('Run Tests') {
      steps {
        sh 'npx ng test --watch=false --browsers=ChromeHeadless'
      }
    }
    
    stage('Build') {
      steps {
        sh 'npx ng build'
      }
    }
  }
}