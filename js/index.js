//Run JQuery
$(document).ready(function(){
  var following=[];
  var logo ="https://www.formisimo.com/blog/wp-content/uploads/2014/04/error-mesage.png";
  
  //FCC stream info and status
  var urlStream = "https://wind-bow.glitch.me/twitch-api/streams/";
  //FCC follower info
  var urlUsers = "https://wind-bow.glitch.me/twitch-api/users/";
  
  //get stream status
  $.getJSON(urlStream+"freecodecamp", function(data){
    var logo = 'https://static-cdn.jtvnw.net/jtv_user_pictures/freecodecamp-profile_image-d9514f2df0962329-300x300.png'; 
    if(data.stream !== null){
       $("#fcpStatus").prepend('<a href="https://www.twitch.tv/freecodecamp" target="_blank"><img src='+logo+' height="70" width="70" style="margin-left: 10px"></a><h6>FCC is offline</h6>');
      $("#streamDetails").html(data.stream.channel.status);
    }
    else{
      $("#fcpStatus").prepend('<a href="https://www.twitch.tv/freecodecamp" target="_blank"><img src='+logo+' height="70" width="70" style="margin-left: 10px"></a><h6>FCC is offline</h6>');
    }
  });//end getJSON
  
  //get followers
  $.getJSON(urlUsers+"freecodecamp/follows/channels", function(data){
    var followers = "";
    for(var x = 0; x < data.follows.length; x++){
      followers = data.follows[x].channel.display_name;
      following.push(followers);
    }
    
    //Doesn't exist
    following.push("comster404");
    following.push("brunofin");
    following.push("TWITCHPRESENTS");
    following.push("ESL_SC2");
    following.push("OgamingSC2");
    following.push("cretetion");
    following.push("storbeck");
    following.push("habathcx");
    following.push("RobotCaleb");
    following.push("noobs2ninjas");
    
    for(var x = 0; x < following.length; x++){
      var url = urlUsers + following[x];
      
      $.getJSON(url).done(function(data){
        var stats;
        var name;
        var link; 
        if(data.error){
          stats = data.error;
          name = data.message;
          $("#followerInfo").prepend('<div class=row><div class=col-md-4><img src='+logo+' height="35" width="35"></div><div class=col-md-4><h6>'+stats+'</h6></div><div class=col-md-4><h6>'+name+'</h6></div></div>');
        }else{
          $.getJSON(urlStream+data.name, function(val){        
              name = data.display_name; 
              logo = data.logo; 
              link = 'https://www.twitch.tv/'+name;
              if(val.stream === null){
                $("#followerInfo").prepend('<div class=row><div class=col-md-4><img src='+logo+' height="35" width="35"></div><div class=col-md-4><h6>Offline</h6></div><div class=col-md-4><h6><a href='+link+' target="_blank">'+name+'</a></h6></div></div>');
              }else{   
                stats = val.stream.channel.status;
                $("#followerInfo").prepend('<div class=row><div class=col-md-4><img src='+logo+' height="35" width="35"></div><div class=col-md-4><h6>'+stats+'</h6></div><div class=col-md-4><h6><a href='+link+' target="_blank">'+name+'</a></h6></div></div>');
              }
          });
        }
      });
    }//end forloop 
  });//end getJSON
});//end docready