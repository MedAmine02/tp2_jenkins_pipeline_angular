pipeline {
  agent any
  
  stages {
    stage('Setup') {
      steps {
        git branch: 'main', url: 'https://github.com/MedAmine02/tp2_jenkins_pipeline_angular'
        
        bat '''
          echo Step 1: Install Angular CLI globally (once per agent)
          npm install -g @angular/cli@17.3.11
          
          echo Step 2: Clean and install project
          rmdir /s /q node_modules 2>nul
          npm install
          
          echo Step 3: Verify
          ng version
        '''
      }
    }
    
    stage('Test') {
      steps {
        bat '''
          echo Running tests with global ng...
          ng test --watch=false --browsers=ChromeHeadless
        '''
      }
    }
    
    stage('Build') {
      steps {
        bat '''
          echo Building...
          ng build
        '''
      }
    }
  }
}