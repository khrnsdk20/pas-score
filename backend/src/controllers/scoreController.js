import pool from '../config/database.js';
import { calculateTotalScore } from '../utils/calculateScore.js';

export async function submitScore(req, res) {
    try {
        const { participantId, competitionId, criteriaId, score } = req.body;
        const juryId = req.user.id;

        // Validate criteria belongs to competition
        const [criteria] = await pool.query(
            'SELECT * FROM criteria WHERE id = ? AND competition_id = ?',
            [criteriaId, competitionId]
        );

        if (criteria.length === 0) {
            return res.status(400).json({ error: 'Invalid criteria for this competition' });
        }

        // Insert or update score
        await pool.query(`
            INSERT INTO scores (participant_id, competition_id, criteria_id, jury_id, score)
            VALUES (?, ?, ?, ?, ?)
            ON DUPLICATE KEY UPDATE score = ?, updated_at = CURRENT_TIMESTAMP
        `, [participantId, competitionId, criteriaId, juryId, score, score]);

        // Emit socket event for real-time update
        const { getIO } = await import('../config/socket.js');
        getIO().emit('score:updated', {
            participantId,
            competitionId,
            criteriaId,
            juryId,
            score
        });

        res.json({
            success: true,
            message: 'Score submitted successfully'
        });
    } catch (error) {
        console.error('Submit score error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export async function getScoresByCompetition(req, res) {
    try {
        const { competitionId } = req.params;

        const [scores] = await pool.query(`
            SELECT 
                s.*,
                p.participant_number,
                p.team_name,
                c.name as criteria_name,
                u.username as jury_username
            FROM scores s
            JOIN participants p ON s.participant_id = p.id
            JOIN criteria c ON s.criteria_id = c.id
            JOIN users u ON s.jury_id = u.id
            WHERE s.competition_id = ?
            ORDER BY p.participant_number, c.id, u.username
        `, [competitionId]);

        res.json({
            success: true,
            scores
        });
    } catch (error) {
        console.error('Get scores error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export async function getParticipantResults(req, res) {
    try {
        const { participantNumber } = req.params;

        // Get participant
        const [participants] = await pool.query(
            'SELECT * FROM participants WHERE participant_number = ?',
            [participantNumber]
        );

        if (participants.length === 0) {
            return res.status(404).json({ error: 'Participant not found' });
        }

        const participant = participants[0];

        // Get all competitions
        const [competitions] = await pool.query('SELECT * FROM competitions');

        const results = [];

        for (const competition of competitions) {
            // Get criteria for this competition
            const [criteria] = await pool.query(
                'SELECT * FROM criteria WHERE competition_id = ?',
                [competition.id]
            );

            // Get scores for this participant and competition
            const [scores] = await pool.query(`
                SELECT s.*, c.name as criteria_name, c.weight, u.username as jury_username
                FROM scores s
                JOIN criteria c ON s.criteria_id = c.id
                JOIN users u ON s.jury_id = u.id
                WHERE s.participant_id = ? AND s.competition_id = ?
            `, [participant.id, competition.id]);

            if (scores.length > 0) {
                const totalScore = calculateTotalScore(scores, criteria);

                results.push({
                    competition: {
                        id: competition.id,
                        name: competition.name,
                        description: competition.description
                    },
                    criteria,
                    scores,
                    totalScore
                });
            }
        }

        res.json({
            success: true,
            participant,
            results
        });
    } catch (error) {
        console.error('Get participant results error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
