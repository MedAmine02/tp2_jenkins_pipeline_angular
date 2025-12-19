pipeline {
  agent any

  triggers {
    githubPush()
  }

  stages {
    stage('Clone Repository') {
      steps {
        git branch: 'main', url: 'https://github.com/MedAmine02/tp2_jenkins_pipeline_angular'
      }
    }

    stage('Install Dependencies') {
      steps {
        bat '''
          echo Step 1: Clean workspace
          rmdir /s /q node_modules 2>nul
          del package-lock.json 2>nul
          
          echo Step 2: Install
          npm install
        '''
      }
    }
    
    stage('Run Tests') {
      steps {
        bat '''
          echo Step 3: Run tests using npm test
          npm test -- --watch=false --browsers=ChromeHeadless
        '''
      }
    }
    
    stage('Build') {
      steps {
        bat '''
          echo Step 4: Build
          npm run build
        '''
      }
    }
  }
}