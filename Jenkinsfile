properties([
  buildDiscarder(logRotator(artifactDaysToKeepStr: '', artifactNumToKeepStr: '32', daysToKeepStr: '', numToKeepStr: '100'))
])

def publish_branches = ["development", "master"]

node('docker') {
  def node = docker.image('node:9.5.0')
  node.pull()
  node.inside {
    withEnv(['npm_config_cache=$WORKSPACE/.npm']){
      stage('Build and publish bundles') {
        checkout scm
        sh 'npm install'
        sh 'npm run build'
        def artifacts = 'dist/devicehive.js, dist/devicehive.min.js'
        archiveArtifacts artifacts: artifacts, fingerprint: true, onlyIfSuccessful: true
        if (publish_branches.contains(env.BRANCH_NAME)) {
          withAWS(credentials:'jenkins-javascript-bundle-uploader'){
            s3Upload(bucket:'devicehive-javascript-bundles', path:"${BRANCH_NAME}/devicehive.js", file:'dist/devicehive.js')
            s3Upload(bucket:'devicehive-javascript-bundles', path:"${BRANCH_NAME}/devicehive.min.js", file:'dist/devicehive.min.js')
          }
        }
      }
    }
  }
}
