import pool from '../config/database.js';
import QRCode from 'qrcode';

export async function getAllParticipants(req, res) {
    try {
        const [rows] = await pool.query(
            'SELECT * FROM participants ORDER BY participant_number'
        );

        res.json({
            success: true,
            participants: rows
        });
    } catch (error) {
        console.error('Get participants error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export async function createParticipant(req, res) {
    try {
        const { participantNumber, teamName, schoolName } = req.body;

        if (!participantNumber || !teamName) {
            return res.status(400).json({ error: 'Participant number and team name required' });
        }

        // Generate QR code
        const qrCodeData = await QRCode.toDataURL(participantNumber);

        const [result] = await pool.query(
            'INSERT INTO participants (participant_number, team_name, school_name, qr_code) VALUES (?, ?, ?, ?)',
            [participantNumber, teamName, schoolName, qrCodeData]
        );

        const [newParticipant] = await pool.query(
            'SELECT * FROM participants WHERE id = ?',
            [result.insertId]
        );

        // Emit socket event for real-time update
        const { getIO } = await import('../config/socket.js');
        getIO().emit('participant:added', newParticipant[0]);

        res.status(201).json({
            success: true,
            participant: newParticipant[0]
        });
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ error: 'Participant number already exists' });
        }
        console.error('Create participant error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export async function updateParticipant(req, res) {
    try {
        const { id } = req.params;
        const { participantNumber, teamName, schoolName } = req.body;

        const [result] = await pool.query(
            'UPDATE participants SET participant_number = ?, team_name = ?, school_name = ? WHERE id = ?',
            [participantNumber, teamName, schoolName, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Participant not found' });
        }

        const [updated] = await pool.query(
            'SELECT * FROM participants WHERE id = ?',
            [id]
        );

        res.json({
            success: true,
            participant: updated[0]
        });
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ error: 'Participant number already exists' });
        }
        console.error('Update participant error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export async function deleteParticipant(req, res) {
    try {
        const { id } = req.params;

        const [result] = await pool.query(
            'DELETE FROM participants WHERE id = ?',
            [id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Participant not found' });
        }

        res.json({
            success: true,
            message: 'Participant deleted successfully'
        });
    } catch (error) {
        console.error('Delete participant error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export async function getParticipantByNumber(req, res) {
    try {
        const { participantNumber } = req.params;

        const [rows] = await pool.query(
            'SELECT * FROM participants WHERE participant_number = ?',
            [participantNumber]
        );

        if (rows.length === 0) {
            return res.status(404).json({ error: 'Participant not found' });
        }

        res.json({
            success: true,
            participant: rows[0]
        });
    } catch (error) {
        console.error('Get participant error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
