import Sentiment from "sentiment";

var sentimentAnalyzer = new Sentiment() ; 

async function getSentiment(text){
    var result = await sentimentAnalyzer.analyze(text) ; 
    var label = "neutral" ; 
    var score = result.comparative ; 
    if (score < -0.2 ){
        label = "very critical";
    }else if (score < -0.1 ){
        label = "critical" ;
    }else if (score > 0.2){
        label = "very supportive" ; 
    } else if (score > 0.1){
        label = "supportive" ;
    }

    // console.log("\n\n score : ",score,"\nlabel :",label , "\n\n") ; 
    return {score:score , label:label}

}

export default getSentiment ; 