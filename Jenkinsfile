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

    stage('Verify Structure') {
      steps {
        bat '''
          echo ===== VERIFYING PROJECT STRUCTURE =====
          echo Current directory: %CD%
          dir
          echo --- Checking package.json ---
          if exist package.json (
            echo "✅ package.json found!"
            type package.json | findstr "name"
            type package.json | findstr "test"
          ) else (
            echo "❌ package.json NOT FOUND!"
            exit 1
          )
        '''
      }
    }

    stage('Clean Install Dependencies') {
      steps {
        bat '''
          echo ===== CLEAN INSTALLATION =====
          
          echo 1. Removing old dependencies...
          rmdir /s /q node_modules 2>nul || echo "No node_modules to remove"
          
          echo 2. Cleaning npm cache...
          npm cache clean --force
          
          echo 3. Installing fresh dependencies...
          npm install --legacy-peer-deps
          
          echo 4. Verifying Angular CLI installation...
          if exist node_modules\\@angular\\cli (
            echo "✅ Angular CLI is installed in node_modules"
          ) else (
            echo "❌ ERROR: Angular CLI missing!"
            echo "Installing Angular CLI explicitly..."
            npm install @angular/cli@17.3.11 --no-save
          )
          
          echo 5. Checking ng command...
          where ng 2>nul && echo "✅ ng found in PATH" || echo "⚠️ ng not in global PATH"
          if exist node_modules\\.bin\\ng.cmd (
            echo "✅ ng.cmd exists in node_modules/.bin/"
          ) else (
            echo "❌ ng.cmd missing from .bin/"
          )
        '''
      }
    }
    
    stage('Run Angular Tests') {
      steps {
        bat '''
          echo ===== RUNNING TESTS =====
          
          echo Method 1: Try npx first...
          npx ng test --watch=false --browsers=ChromeHeadless --no-progress
          
          REM If npx fails, try alternative methods
          if errorlevel 1 (
            echo "npx failed, trying npm test..."
            npm test -- --watch=false --browsers=ChromeHeadless --no-progress
          )
          
          if errorlevel 1 (
            echo "npm test failed, trying direct ng..."
            if exist node_modules\\.bin\\ng.cmd (
              node_modules\\.bin\\ng.cmd test --watch=false --browsers=ChromeHeadless --no-progress
            ) else (
              echo "All test methods failed!"
              exit 1
            )
          )
        '''
      }
    }
    
    stage('Build Angular Project') {
      steps {
        bat '''
          echo ===== BUILDING PROJECT =====
          npx ng build --configuration production
          
          echo ===== BUILD COMPLETE =====
          echo Build files created in: dist/
          if exist dist (
            dir dist
          )
        '''
      }
    }
  }

  post {
    success {
      echo '✅ Build et analyse terminés avec succès !'
      archiveArtifacts artifacts: 'dist/**/*', fingerprint: true
    }
    failure {
      echo '❌ Échec du build ou des tests.'
    }
    always {
      echo '=== Pipeline execution completed ==='
    }
  }
}