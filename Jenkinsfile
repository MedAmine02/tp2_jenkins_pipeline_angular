pipeline {
  agent any
  
  stages {
    stage('Diagnose Everything') {
      steps {
        bat '''
          echo ===== COMPLETE DIAGNOSTICS =====
          
          echo 1. System Information:
          echo %CD%
          node --version
          npm --version
          
          echo 2. Repository Contents:
          dir
          
          echo 3. Package.json Analysis:
          type package.json
          
          echo 4. Check if npm install works:
          rmdir /s /q node_modules 2>nul
          npm install --no-audit
          
          echo 5. What was installed?
          echo --- Angular packages ---
          dir node_modules\\@angular 2>nul && (
            dir node_modules\\@angular
          ) || echo "NO @angular FOLDER!"
          
          echo --- Checking for ng binary ---
          dir /s /b *ng* 2>nul || echo "No ng files found"
          
          echo --- .bin directory ---
          dir node_modules\\.bin 2>nul || echo "No .bin directory"
          
          echo 6. Try to find ANY executable:
          where ng 2>nul || echo "ng not in PATH"
          where node 2>nul || echo "node not in PATH"
          where npm 2>nul || echo "npm not in PATH"
          
          echo 7. Attempt to run Angular CLI directly:
          if exist "node_modules\\@angular\\cli\\bin\\ng" (
            echo "Found ng at: node_modules\\@angular\\cli\\bin\\ng"
            echo "Attempting to run it..."
            node "node_modules\\@angular\\cli\\bin\\ng" --version
          ) else (
            echo "ng NOT FOUND at expected location"
          )
        '''
      }
    }
  }
}