pipeline {
  agent any

  triggers {
    githubPush()
  }

  stages {
    stage('Verify Environment') {
      steps {
        bat '''
          echo === VERIFYING JENKINS ENVIRONMENT ===
          echo Node.js version:
          node --version || echo "ERROR: Node.js not found!"
          echo
          echo npm version:
          npm --version || echo "ERROR: npm not found!"
          echo
          echo Current directory:
          echo %CD%
          echo
          echo Checking for package.json:
          if exist package.json (echo "✅ Found package.json") else (echo "❌ No package.json!")
        '''
      }
    }

    stage('Clean & Install') {
      steps {
        bat '''
          echo === CLEANING & INSTALLING ===
          echo Removing old dependencies...
          rmdir /s /q node_modules 2>nul || echo "No node_modules to remove"
          del package-lock.json 2>nul || echo "No package-lock.json"
          
          echo Cleaning npm cache...
          npm cache clean --force
          
          echo Installing fresh dependencies...
          npm ci
          
          echo Verifying Angular CLI installation...
          if exist node_modules\\@angular\\cli (
            echo "✅ Angular CLI installed in node_modules"
          ) else (
            echo "❌ Angular CLI missing!"
            exit 1
          )
        '''
      }
    }
    
    stage('Run Tests - Using npm run') {
      steps {
        bat '''
          echo === RUNNING TESTS ===
          echo Using npm run test (NOT npx)...
          npm run test -- --watch=false --browsers=ChromeHeadless --no-progress
        '''
      }
    }
    
    stage('Build Project') {
      steps {
        bat '''
          echo === BUILDING ===
          npm run build
        '''
      }
    }
  }

  post {
    success {
      echo '✅ Build successful! Tests passed.'
    }
    failure {
      echo '❌ Build or tests failed.'
    }
  }
}