function checkSignIn(){

  firebase.auth().onAuthStateChanged( function(user){
      if(user){
        document.getElementById("signinStatus").innerHTML="Hello " + user.displayName ;
        document.getElementById("signinGroup").style.display="none";
        document.getElementById("signoutGroup").style.display="block";
      } 
      else {
        document.getElementById("signinStatus").innerHTML="Please Sign-In " ;
        document.getElementById("signinGroup").style.display="block";
        document.getElementById("signoutGroup").style.display="none";
      }
  }
  )  
}

function doSignIn(providerName){
  
  switch(providerName){
    case "facebook":
      var provider = new firebase.auth.FacebookAuthProvider();
      firebase.auth().signInWithPopup(provider).then(function(result){
        console.log("User: " + result.user.displayName);
        console.log("AuthCredential: " + result.credential.providerId);
      })
      break;
    case "google":
      var provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithRedirect(provider).then(function(result){
        console.log("Do Redirect");
      })
      break;
    default:

  }

}

function doSignOut(){
  firebase.auth().signOut();
  }