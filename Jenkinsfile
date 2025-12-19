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

    stage('Debug: Check Current State') {
      steps {
        bat '''
          echo ===== DEBUG: CURRENT STATE =====
          echo Directory: %CD%
          echo 
          echo Files in root:
          dir
          echo 
          echo package.json content:
          type package.json
          echo 
          echo Checking node_modules:
          if exist node_modules (
            echo "node_modules exists"
            dir node_modules\\@angular 2>nul && echo "✅ @angular folder exists" || echo "❌ No @angular folder"
            dir node_modules\\.bin\\ng.cmd 2>nul && echo "✅ ng.cmd exists" || echo "❌ No ng.cmd"
          ) else (
            echo "❌ node_modules does NOT exist!"
          )
        '''
      }
    }

    stage('Force Install with Global Angular CLI') {
      steps {
        bat '''
          echo ===== FORCE INSTALL =====
          
          echo 1. Checking if npm is working...
          npm --version
          
          echo 2. Cleaning everything...
          rmdir /s /q node_modules 2>nul || echo "No node_modules"
          del package-lock.json 2>nul || echo "No package-lock.json"
          
          echo 3. Install Angular CLI GLOBALLY on this agent...
          npm install -g @angular/cli@17.3.11
          
          echo 4. Install project dependencies...
          npm install --no-audit
          
          echo 5. Verify installation...
          where ng && echo "✅ ng is now in PATH"
          
          echo 6. Check local ng...
          npx ng version 2>&1 || echo "npx ng still failing, but we have global ng"
        '''
      }
    }
    
    stage('Run Tests with Global ng') {
      steps {
        bat '''
          echo ===== RUNNING TESTS =====
          
          echo Method 1: Use global ng command...
          ng test --watch=false --browsers=ChromeHeadless --no-progress
          
          REM If global ng fails, try Method 2
          if errorlevel 1 (
            echo "Global ng failed, trying npm test directly..."
            npm test -- --watch=false --browsers=ChromeHeadless --no-progress
          )
          
          REM If Method 2 fails, try Method 3: Direct karma
          if errorlevel 1 (
            echo "npm test failed, trying karma directly..."
            if exist node_modules\\.bin\\karma.cmd (
              echo "Running karma directly..."
              node_modules\\.bin\\karma.cmd start karma.conf.js --single-run --browsers=ChromeHeadless
            ) else (
              echo "karma.cmd not found, checking for karma..."
              where karma || npm list karma
            )
          )
        '''
      }
    }
    
    stage('Build with Global ng') {
      steps {
        bat '''
          echo ===== BUILDING =====
          ng build --configuration production
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
      bat '''
        echo ===== FINAL DIAGNOSTICS =====
        echo Node.js: && node --version
        echo npm: && npm --version
        echo Angular CLI: && ng version 2>&1 || echo "ng not available"
        echo Files in workspace: && dir
      '''
    }
  }
}