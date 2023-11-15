let c=0;

function calculateMetrics(confusionMatrix) {
    c++

    let curr = bird.split("/")[2]

    let corr_pred  = 0
    let wrong_pred = 0

    if(curr=="bird"){
        corr_pred  = confusionMatrix.True_Pos || 0;
        wrong_pred = confusionMatrix.False_Pos || 0;
    }
    else{
        corr_pred  = confusionMatrix.True_Neg || 0;
        wrong_pred = confusionMatrix.False_Neg || 0;
    }

    return {
        "Accuracy ": `${(corr_pred*100/c).toFixed(2)}% (${corr_pred}/${c})`,
        "Error  ": `${(wrong_pred*100/c).toFixed(2)}% (${wrong_pred}/${c})`,
    };

    
}


