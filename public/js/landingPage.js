$(function(){

    $.get("/userApiData",function(data){
        console.log(data);

        for (var i=0; i<data.length; i++){
            $("#nameReturnData").append(" <option>"+data[i].firstName+" "+data[i].lastName+"</option>")

        }

    });



//This is User Auth
    // $("#clickStart2").on("click",function(){
    //     $(this).attr("id", "#clickStart3");
    //     console.log("its click 2");
        
    //     var userPass = $("#userInputPassword1").val().trim();
    //     var thisButton = $(this);
        
    //     $.get("/userApiData",function(data){
            
    //          for (var i=0; i<data.length; i++){
    //             if (userPass === data[i].password){
    //                 $(thisButton).attr("href","/port").click();
    //                 $(thisButton).attr("id","#clickStart3");
                    
                    
    //             }
    //             else{
    //                 $(thisButton).attr("href","/");
    //                 alert("please enter correct password!!");
    //             }
    
    //         }
            
    
    //     });
        
    // });

    // $("#clickStart3").on("click",function(){
    //     console.log("its click 2");
    //     $(this).attr("id", "#clickStart2");
        
    //     var userPass = $("#userInputPassword1").val().trim();
    //     var thisButton = $(this);
        
    //     $.get("/userApiData",function(data){
            
    //          for (var i=0; i<data.length; i++){
    //             if (userPass === data[i].password){
    //                 $(thisButton).attr("href","/port").click();
    //                 $(thisButton).attr("id","#clickStart2");
                    
                    
    //             }
    //             else{
    //                 $(thisButton).attr("href","/");
    //                 alert("please enter correct password!!");
    //             }
    
    //         }
            
    
    //     });
        
    // });


    
//This is User Auth

    
  $("#clickStart").on('click',function(){
    //   alert("clicked");
    var userdata = {
        userName : $("#username").val().trim(),
        firstName : $("#userfirstName").val().trim(),
        lastName : $("#userlastName").val().trim(),
        password : $("#userPassword").val().trim()
        
    };


    $.post("/userIntData", userdata,function(data){
        console.log(data);
    });
    
   
    
  });


  
    
});