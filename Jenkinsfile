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

    stage('Install Dependencies - NO NXP') {
      steps {
        bat '''
          echo ===== STEP 1: CLEAN EVERYTHING =====
          echo Removing ALL previous installations...
          rmdir /s /q node_modules 2>nul
          del package-lock.json 2>nul
          del ng.cmd 2>nul
          
          echo ===== STEP 2: INSTALL WITH VERBOSE LOGGING =====
          echo Installing dependencies...
          npm install --no-audit 2>&1 | findstr "angular"
          
          echo ===== STEP 3: VERIFY ANGULAR CLI IS INSTALLED =====
          if exist node_modules\\@angular\\cli\\bin\\ng (
            echo "✅ Angular CLI binary exists at: node_modules\\@angular\\cli\\bin\\ng"
            echo Testing direct execution...
            node node_modules\\@angular\\cli\\bin\\ng --version
          ) else (
            echo "❌ CRITICAL: Angular CLI binary NOT FOUND!"
            echo Listing @angular folder contents:
            dir node_modules\\@angular 2>nul || echo "No @angular folder!"
            exit 1
          )
        '''
      }
    }
    
    stage('Run Tests - DIRECT NODE EXECUTION') {
      steps {
        bat '''
          echo ===== RUNNING TESTS - NO NXP =====
          echo NEVER using npx - using direct node execution instead...
          
          REM Method 1: Direct Node.js execution of Angular CLI
          echo "Executing: node node_modules\\@angular\\cli\\bin\\ng test --watch=false --browsers=ChromeHeadless --no-progress"
          node node_modules\\@angular\\cli\\bin\\ng test --watch=false --browsers=ChromeHeadless --no-progress
          
          REM If Method 1 fails, the build stops here with clear error
        '''
      }
    }
    
    stage('Build - DIRECT NODE EXECUTION') {
      steps {
        bat '''
          echo ===== BUILDING - NO NXP =====
          echo "Executing: node node_modules\\@angular\\cli\\bin\\ng build"
          node node_modules\\@angular\\cli\\bin\\ng build --configuration production
        '''
      }
    }
  }

  post {
    success {
      echo '✅ Build et analyse terminés avec succès !'
    }
    failure {
      echo '❌ Échec du build ou des tests.'
    }
  }
}