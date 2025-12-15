import pool, { initializeDatabase } from '../config/database.js';
import bcrypt from 'bcrypt';

async function seedDatabase() {
    try {
        // Initialize database tables first
        console.log('📋 Initializing database tables...');
        await initializeDatabase();

        const connection = await pool.getConnection();

        try {
            await connection.query('START TRANSACTION');

            console.log('🌱 Seeding database...');

            // Create admin user
            const adminPassword = await bcrypt.hash('admin123', 10);
            await connection.query(
                `INSERT IGNORE INTO users (username, password, role, full_name) 
         VALUES (?, ?, ?, ?)`,
                ['admin', adminPassword, 'admin', 'Administrator']
            );
            console.log('✅ Admin user created (username: admin, password: admin123)');

            // Create jury users
            const juryPassword = await bcrypt.hash('jury123', 10);
            for (let i = 1; i <= 3; i++) {
                await connection.query(
                    `INSERT IGNORE INTO users (username, password, role, full_name) 
           VALUES (?, ?, ?, ?)`,
                    [`juri${i}`, juryPassword, 'jury', `Juri ${i}`]
                );
            }
            console.log('✅ Jury users created (username: juri1-3, password: jury123)');

            // Create competitions
            const competitions = [
                { name: 'Peraturan Baris Berbaris (PBB)', description: 'Penilaian kemampuan PBB peserta' },
                { name: 'Tongkat Komando', description: 'Penilaian keterampilan tongkat komando' },
                { name: 'Variasi Formasi', description: 'Penilaian kreativitas formasi' },
                { name: 'Penampilan Umum', description: 'Penilaian penampilan keseluruhan' }
            ];

            const competitionIds = [];
            for (const comp of competitions) {
                const [result] = await connection.query(
                    `INSERT INTO competitions (name, description) 
           VALUES (?, ?)
           ON DUPLICATE KEY UPDATE id=LAST_INSERT_ID(id)`,
                    [comp.name, comp.description]
                );
                competitionIds.push(result.insertId);
            }
            console.log('✅ Competitions created');

            // Create criteria for each competition
            const criteriaTemplates = [
                { name: 'Ketepatan Gerakan', weight: 30 },
                { name: 'Kekompakan', weight: 25 },
                { name: 'Kedisiplinan', weight: 20 },
                { name: 'Penampilan', weight: 15 },
                { name: 'Semangat', weight: 10 }
            ];

            for (const compId of competitionIds) {
                for (const criteria of criteriaTemplates) {
                    await connection.query(
                        `INSERT INTO criteria (competition_id, name, weight, max_score) 
             VALUES (?, ?, ?, ?)`,
                        [compId, criteria.name, criteria.weight, 100]
                    );
                }
            }
            console.log('✅ Criteria created for all competitions');

            // Create sample participants
            for (let i = 1; i <= 10; i++) {
                const participantNumber = `PSK${String(i).padStart(3, '0')}`;
                await connection.query(
                    `INSERT IGNORE INTO participants (participant_number, team_name, school_name) 
           VALUES (?, ?, ?)`,
                    [participantNumber, `Tim ${i}`, `SMA Negeri ${i}`]
                );
            }
            console.log('✅ Sample participants created (PSK001 - PSK010)');

            await connection.query('COMMIT');
            console.log('🎉 Database seeded successfully!');
        } catch (error) {
            await connection.query('ROLLBACK');
            console.error('❌ Error seeding database:', error);
            throw error;
        } finally {
            connection.release();
        }
    } catch (error) {
        console.error('❌ Seeding failed:', error);
        throw error;
    }
}

// Run seeder
seedDatabase()
    .then(() => {
        console.log('✅ Seeding completed');
        process.exit(0);
    })
    .catch((error) => {
        console.error('❌ Seeding failed:', error.message);
        process.exit(1);
    });
