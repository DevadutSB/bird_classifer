function calculateMetrics(confusionMatrix) {
    const True_Pos = confusionMatrix.True_Pos || 0;
    const True_Neg = confusionMatrix.True_Neg || 0;
    const False_Pos = confusionMatrix.False_Pos || 0;
    const False_Neg = confusionMatrix.False_Neg || 0;

    const totalTrue = True_Pos + True_Neg + False_Pos + False_Neg;

    let precision = True_Pos / (True_Pos + False_Pos);
    let recall = True_Pos / (True_Pos + False_Neg);

    precision = isNaN(precision) ? 0 : precision
    recall    = isNaN(recall) ? 0    : recall

    const f1Score = (2 * (precision * recall)) / (precision + recall === 0 ? 1 : precision + recall);

    return {
        Precision: precision,
        Recall: recall,
        "F1-Score": f1Score,
        "Correctly Predicted": True_Pos + True_Neg,
        "Support": totalTrue
    };
}


