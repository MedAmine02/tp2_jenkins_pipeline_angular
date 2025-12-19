pipeline {
  agent any

  triggers {
    githubPush()
  }

  stages {
    stage('Clone') {
      steps {
        git branch: 'main', url: 'https://github.com/MedAmine02/tp2_jenkins_pipeline_angular'
      }
    }

    stage('Install') {
      steps {
        bat '''
          REM Clean installation
          rmdir /s /q node_modules 2>nul
          npm install
        '''
      }
    }
    
    stage('Test') {
      steps {
        bat '''
          REM Use the ng command from package.json scripts
          npm test -- --watch=false --browsers=ChromeHeadless
        '''
      }
    }
    
    stage('Build') {
      steps {
        bat '''
          npm run build
        '''
      }
    }
  }

  post {
    success {
      echo '✅ Success! Tests passed and build completed.'
    }
    failure {
      echo '❌ Build or tests failed.'
    }
  }
}