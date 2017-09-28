$(function(){

     

    $("#clickSearchApi").on("click", function(){
        var searchData = $("#searchStock").val().trim();
        
        $.ajax({
            url :"https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&interval=1min&outputsize=compact&symbol="+searchData+"&apikey=2RSV7N7N7MPT3YJN",
            method : "GET"

        }).done(function(data){
            console.log(data);
            var arrayOfData = Object.keys(data["Time Series (1min)"]);
            
            console.log(data["Time Series (1min)"][arrayOfData[0]]["4. close"]);

            $("#stockTicker").html(searchData);
            $("#currentPriceApi").html('$ '+data["Time Series (1min)"][arrayOfData[0]]["4. close"]);

        });

    });


    $("#clickEntryData").on("click",function(){
        var tickerEntry = $("#tickerEntry").val().trim();
        var stockData = {
            userTicker : tickerEntry,
            userShares : $("#numOfSharesEntry").val().trim(),
        

        };

        //api call 
        $.ajax({
            url :"https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&interval=1min&outputsize=compact&symbol="+tickerEntry+"&apikey=2RSV7N7N7MPT3YJN",
            method : "GET"

        }).done(function(data){
            var arrayOfData;
            //SQL stock Trans data 
            $.get("/stockTransData",function(dataFromStockTrans){
                console.log(dataFromStockTrans);
                
                
                if(dataFromStockTrans.length == 0 ){ 
                    arrayOfData = Object.keys(data["Time Series (1min)"]);
                    stockData.currentPrice = data["Time Series (1min)"][arrayOfData[0]]["4. close"];        
                    $.post("/userTransData",stockData,function(data){
                        console.log(data);
                    });
                }

                else if(dataFromStockTrans.length > 0  ){
                    for (var i=0; i < dataFromStockTrans.length; i++){


                        if( tickerEntry == dataFromStockTrans[i]["companyName"]){
                            console.log(dataFromStockTrans[i]["id"]);

                            $.ajax({
                                url : "/updateStockTrans",
                                method : "PUT",
                                data :  { newNumOfShares : dataFromStockTrans[i]["numOfShares"] +  }
                            })

                        }

                        else if (tickerEntry !== dataFromStockTrans[i]["companyName"]){
                            $.post("/userTransData",stockData,function(data){
                                console.log(data);
                            }); 
                        }
                    }
                }
            });
            
            // console.log(data);

            //  arrayOfData = Object.keys(data["Time Series (1min)"]);
            
            
            // console.log(data["Time Series (1min)"][arrayOfData[0]]["4. close"]);

            // stockData.currentPrice = data["Time Series (1min)"][arrayOfData[0]]["4. close"];
           

            // $.post("/userTransData",stockData,function(data){
            //     console.log(data);
            // });


            

        });

        
       

        


    });

});