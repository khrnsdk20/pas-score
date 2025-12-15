import pool from '../config/database.js';

export async function getAllCompetitions(req, res) {
    try {
        const [competitions] = await pool.query(`
            SELECT 
                c.id,
                c.name,
                c.description,
                c.created_at,
                COUNT(DISTINCT p.id) as participant_count,
                JSON_ARRAYAGG(
                    JSON_OBJECT(
                        'id', cr.id,
                        'name', cr.name,
                        'weight', cr.weight,
                        'max_score', cr.max_score
                    )
                ) as criteria
            FROM competitions c
            LEFT JOIN participants p ON 1=1
            LEFT JOIN criteria cr ON cr.competition_id = c.id
            GROUP BY c.id, c.name, c.description, c.created_at
            ORDER BY c.created_at DESC
        `);

        res.json({
            success: true,
            competitions
        });
    } catch (error) {
        console.error('Get competitions error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export async function createCompetition(req, res) {
    try {
        const { name, description } = req.body;

        if (!name) {
            return res.status(400).json({ error: 'Competition name required' });
        }

        const [result] = await pool.query(
            'INSERT INTO competitions (name, description) VALUES (?, ?)',
            [name, description]
        );

        const [newCompetition] = await pool.query(
            'SELECT * FROM competitions WHERE id = ?',
            [result.insertId]
        );

        res.status(201).json({
            success: true,
            competition: newCompetition[0]
        });
    } catch (error) {
        console.error('Create competition error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export async function updateCompetition(req, res) {
    try {
        const { id } = req.params;
        const { name, description } = req.body;

        const [result] = await pool.query(
            'UPDATE competitions SET name = ?, description = ? WHERE id = ?',
            [name, description, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Competition not found' });
        }

        const [updated] = await pool.query(
            'SELECT * FROM competitions WHERE id = ?',
            [id]
        );

        res.json({
            success: true,
            competition: updated[0]
        });
    } catch (error) {
        console.error('Update competition error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export async function deleteCompetition(req, res) {
    try {
        const { id } = req.params;

        const [result] = await pool.query(
            'DELETE FROM competitions WHERE id = ?',
            [id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Competition not found' });
        }

        res.json({
            success: true,
            message: 'Competition deleted successfully'
        });
    } catch (error) {
        console.error('Delete competition error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export async function addCriteria(req, res) {
    try {
        const { competitionId } = req.params;
        const { name, weight, maxScore = 100 } = req.body;

        if (!name || !weight) {
            return res.status(400).json({ error: 'Criteria name and weight required' });
        }

        const [result] = await pool.query(
            'INSERT INTO criteria (competition_id, name, weight, max_score) VALUES (?, ?, ?, ?)',
            [competitionId, name, weight, maxScore]
        );

        const [newCriteria] = await pool.query(
            'SELECT * FROM criteria WHERE id = ?',
            [result.insertId]
        );

        res.status(201).json({
            success: true,
            criteria: newCriteria[0]
        });
    } catch (error) {
        console.error('Add criteria error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export async function updateCriteria(req, res) {
    try {
        const { id } = req.params;
        const { name, weight, maxScore } = req.body;

        const [result] = await pool.query(
            'UPDATE criteria SET name = ?, weight = ?, max_score = ? WHERE id = ?',
            [name, weight, maxScore, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Criteria not found' });
        }

        const [updated] = await pool.query(
            'SELECT * FROM criteria WHERE id = ?',
            [id]
        );

        res.json({
            success: true,
            criteria: updated[0]
        });
    } catch (error) {
        console.error('Update criteria error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export async function deleteCriteria(req, res) {
    try {
        const { id } = req.params;

        const [result] = await pool.query(
            'DELETE FROM criteria WHERE id = ?',
            [id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Criteria not found' });
        }

        res.json({
            success: true,
            message: 'Criteria deleted successfully'
        });
    } catch (error) {
        console.error('Delete criteria error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
