$(function(){
    var purchesedPort=[]; 
    var currentPriceArray=[];
    var allStockTicker=[];
    var allStockAmout = [];
    var allStockCurrentPrice= [];
    var cash = 100000;
    //data From Stock Trans Table 
    
    
    function getStockTransData() {
     
       
        $.get("/stockTransData",function(dataFromStockTrans){
            $("#transactionInfo").html("");
            console.log(dataFromStockTrans);
           
            for (var i=0; i<dataFromStockTrans.length; i++){
                                           

                $("#transactionInfo").append("<h5> Company Ticker : "+dataFromStockTrans[i].companyName+"   Amount of Shares : "+dataFromStockTrans[i].numOfShares+"   Price : "+dataFromStockTrans[i].totalCostOf+"</h5><br>");

                purchesedPort.push(dataFromStockTrans[i].totalCostOf);
                allStockTicker.push(dataFromStockTrans[i].companyName);
                allStockAmout.push(parseInt(dataFromStockTrans[i].numOfShares));
            }
            
        });
        }


        // function currentPriceValue(){
        //     for (var i=0; i<allStockTicker.length;i++){
        //     $.ajax({
        //         url :"https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&interval=1min&outputsize=compact&symbol="+allStockTicker[i]+"&apikey=2RSV7N7N7MPT3YJN",
        //         method : "GET"
    
        //     }).done(function(data){
        //         console.log(data);
        //         var arrayOfData = Object.keys(data["Time Series (1min)"]);
        //          allStockCurrentPrice.push(parseInt(data["Time Series (1min)"][arrayOfData[0]]["4. close"]));

        //         });
                
        // }
        // allStockTicker=[];
        // }

        function currentPrice() {
           

       var purchasePrice = purchesedPort.reduce(
        function (
          accumulator,
          currentValue,
          currentIndex,
          array
        ) {
          return accumulator + currentValue;
        }
    
        
      );

      console.log(purchasePrice);
    //   console.log(allStockTicker);
      console.log(allStockAmout);
      console.log(allStockCurrentPrice);
      allStockCurrentPrice = [];
      
      allStockAmout = [];
      var finalAmount = cash - purchasePrice  
      $("#displayData").html("<h3> Remaining Cash : $"+finalAmount+"</h3></br><h3> Invested Cash : $"+purchasePrice);
        }


    
    

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
            arrayOfData = Object.keys(data["Time Series (1min)"]);
             stockData.currentPrice = data["Time Series (1min)"][arrayOfData[0]]["4. close"]; 
            $.post("/userTransData",stockData,function(data){
                           console.log(data);
                        });
            
            setTimeout(getStockTransData,2000);
            // setTimeout(currentPriceValue, 3000);
            setTimeout(currentPrice,3000);

            

        });

    });


    $("#clickEntryDataToSell").on("click",function(){
        $.get("/stockTransData",function(dataFromStockTrans){
                console.log(dataFromStockTrans);
                var stockData = {
                    userTicker : tickerEntry,
                    userShares : $("#numOfSharesEntry").val().trim()};
               
                          

                 if(dataFromStockTrans.length > 0 ){
                     console.log('it works');
                    for (var i=0; i < dataFromStockTrans.length; i++){

                        if( tickerEntry == dataFromStockTrans[i]["companyName"]){
                            console.log(dataFromStockTrans[i]["id"]);

                            $.ajax({
                                url : "/updateStockTrans",
                                method : "PUT",
                                data :  { 
                                    userTicker : tickerEntry,
                                    newNumOfShares : pasrseInt(dataFromStockTrans[i]["numOfShares"]) - parseInt(stockData.userShares)

                                }
                            });

                        }

                       
                    }
                } 
    });



});

});