// Builds a SQLite database from the synthetic handoff scenarios CSV.
// The CSV (docs/homelessness-handoff-scenarios.csv) is the source of truth —
// this script only mirrors it into a queryable form. Re-run after editing the CSV.

import { DatabaseSync } from 'node:sqlite';
import { readFileSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const rootDir = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const csvPath = path.join(rootDir, 'docs', 'homelessness-handoff-scenarios.csv');
const dbPath = path.join(rootDir, 'data', 'caregrid.sqlite');

function parseCsv(text) {
	const [headerLine, ...lines] = text.trim().split('\n');
	const headers = headerLine.split(',');
	return lines.map((line) => {
		const values = line.split(',');
		return Object.fromEntries(headers.map((header, i) => [header, values[i]]));
	});
}

const rows = parseCsv(readFileSync(csvPath, 'utf-8'));

mkdirSync(path.dirname(dbPath), { recursive: true });
const db = new DatabaseSync(dbPath);

db.exec(`
	DROP TABLE IF EXISTS HandoffScenarios;
	CREATE TABLE HandoffScenarios (
		scenario_id TEXT PRIMARY KEY,
		person_context TEXT NOT NULL,
		immediate_need TEXT NOT NULL,
		public_resource_type TEXT NOT NULL,
		information_to_confirm TEXT NOT NULL,
		safe_next_step TEXT NOT NULL,
		handoff_owner_type TEXT NOT NULL,
		follow_up_window TEXT NOT NULL,
		capacity_is_not_live INTEGER NOT NULL CHECK (capacity_is_not_live IN (0, 1)),
		is_synthetic INTEGER NOT NULL CHECK (is_synthetic = 1)
	);
`);

const insert = db.prepare(`
	INSERT INTO HandoffScenarios (
		scenario_id, person_context, immediate_need, public_resource_type,
		information_to_confirm, safe_next_step, handoff_owner_type, follow_up_window,
		capacity_is_not_live, is_synthetic
	) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
`);

for (const row of rows) {
	insert.run(
		row.scenario_id,
		row.person_context,
		row.immediate_need,
		row.public_resource_type,
		row.information_to_confirm,
		row.safe_next_step,
		row.handoff_owner_type,
		row.follow_up_window,
		row.capacity_is_not_live === 'true' ? 1 : 0,
		row.is_synthetic === 'true' ? 1 : 0
	);
}

db.close();

console.log(`Wrote ${rows.length} synthetic scenarios to ${path.relative(rootDir, dbPath)}`);
