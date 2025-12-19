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

    stage('Verify and Install') {
      steps {
        bat '''
          echo ===== STEP 1: VERIFY PROJECT =====
          echo Current directory: %CD%
          if not exist package.json (
            echo "ERROR: No package.json found!"
            dir
            exit 1
          )
          
          echo Checking package.json scripts...
          type package.json | findstr "scripts"
          
          echo ===== STEP 2: CLEAN INSTALL =====
          echo Removing old node_modules...
          rmdir /s /q node_modules 2>nul || echo "No node_modules to remove"
          
          echo Installing dependencies...
          npm install --no-audit --legacy-peer-deps
          
          echo ===== STEP 3: CREATE MANUAL NG COMMAND =====
          echo Creating ng.cmd manually...
          echo @echo off > node_modules\\.bin\\ng.cmd
          echo "%~dp0\\node.exe" "%~dp0\\..\\@angular\\cli\\bin\\ng" %%* >> node_modules\\.bin\\ng.cmd
          
          echo ===== STEP 4: VERIFY NG COMMAND =====
          echo Testing the ng command...
          if exist node_modules\\.bin\\ng.cmd (
            echo "✅ ng.cmd created successfully"
            node_modules\\.bin\\ng.cmd version 2>&1 || echo "ng version command failed, but file exists"
          ) else (
            echo "❌ Failed to create ng.cmd"
            echo "Creating it with alternative method..."
            echo @IF EXIST "%%~dp0\\node.exe" ( "%%~dp0\\node.exe" "%%~dp0\\..\\@angular\\cli\\bin\\ng" %%* ) ELSE ( node "%%~dp0\\..\\@angular\\cli\\bin\\ng" %%* ) > node_modules\\.bin\\ng.cmd
          )
        '''
      }
    }
    
    stage('Run Tests - DIRECT EXECUTION') {
      steps {
        bat '''
          echo ===== RUNNING TESTS =====
          
          echo Method 1: Direct Angular CLI execution...
          node node_modules\\@angular\\cli\\bin\\ng test --watch=false --browsers=ChromeHeadless --no-progress
          
          REM If Method 1 fails, try Method 2
          if errorlevel 1 (
            echo "Method 1 failed, trying npm test..."
            npm test -- --watch=false --browsers=ChromeHeadless --no-progress
          )
          
          REM If Method 2 fails, try Method 3
          if errorlevel 1 (
            echo "npm test failed, trying direct karma..."
            node node_modules\\karma\\bin\\karma start karma.conf.js --single-run --browsers=ChromeHeadless
          )
        '''
      }
    }
    
    stage('Build - DIRECT EXECUTION') {
      steps {
        bat '''
          echo ===== BUILDING =====
          node node_modules\\@angular\\cli\\bin\\ng build --configuration production
          
          REM Alternative if above fails
          if errorlevel 1 (
            npm run build
          )
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