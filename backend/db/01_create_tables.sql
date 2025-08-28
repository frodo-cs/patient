CREATE TABLE patient (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    identification_number VARCHAR(50) UNIQUE NOT NULL,
    dob DATE,
    clinician VARCHAR(255),
    physician VARCHAR(255),
    start_of_care DATE
);

CREATE TABLE note (
    id SERIAL PRIMARY KEY,
    patient_id INT NOT NULL REFERENCES patient(id) ON DELETE CASCADE,
    transcription TEXT NOT NULL,
    summary TEXT,
    datetime TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    s3_key VARCHAR(255) 
);

CREATE TABLE form (
    id SERIAL PRIMARY KEY,
    note_id INT NOT NULL REFERENCES note(id) ON DELETE CASCADE,
    data JSONB 
);
