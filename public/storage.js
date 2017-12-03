var uploader = document.getElementById("uploader");
var fileButton = document.getElementById("fileButton");
var storageRef;
firebase.auth().onAuthStateChanged(function(user) {
    storageRef = firebase.storage().ref('images/' + user.uid + '/target.png');
});

fileButton.addEventListener('change', function(e){
    //console.log(">>>" + e.target.files[0].name);
    var file = e.target.files[0];
    
    var task = storageRef.put(file);

    task.on('state_changed',
            function progress(snapshot){
                var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                uploader.value = percentage;
            },
            null,
            function complete(){                                
                console.log('upload completed ' + storageRef.fullPath );  
                storageRef.getDownloadURL().then(function(url){
                    document.getElementById("targetImage").src = url;
                });                     
            }
    );


}); 
