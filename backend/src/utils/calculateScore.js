/**
 * Calculate total score for a participant in a competition
 * @param {Array} scores - Array of score objects with criteria info
 * @param {Array} criteria - Array of criteria objects with weights
 * @returns {number} - Calculated total score
 */
export function calculateTotalScore(scores, criteria) {
    let totalScore = 0;
    let totalWeight = 0;

    // Group scores by criteria
    const scoresByCriteria = scores.reduce((acc, score) => {
        if (!acc[score.criteria_id]) {
            acc[score.criteria_id] = [];
        }
        acc[score.criteria_id].push(parseFloat(score.score));
        return acc;
    }, {});

    // Calculate weighted average for each criteria
    criteria.forEach(criterion => {
        const criteriaScores = scoresByCriteria[criterion.id] || [];
        if (criteriaScores.length > 0) {
            // Average score from all jury members
            const avgScore = criteriaScores.reduce((a, b) => a + b, 0) / criteriaScores.length;
            // Apply weight
            const weight = parseFloat(criterion.weight);
            totalScore += avgScore * (weight / 100);
            totalWeight += weight;
        }
    });

    return totalWeight > 0 ? parseFloat(totalScore.toFixed(2)) : 0;
}
