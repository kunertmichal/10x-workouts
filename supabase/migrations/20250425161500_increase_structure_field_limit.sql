-- migration: increase structure field character limit in workouts table
-- created: 2024-04-23 16:15:00 utc
-- description: increases the character limit for the structure field from 1000 to 2000 characters

-- modify the check constraint on the structure field
alter table workouts
    drop constraint if exists workouts_structure_check,
    add constraint workouts_structure_check check (char_length(structure::text) <= 2000);

-- add comment explaining the change
comment on column workouts.structure is 'JSON structure of the workout, limited to 2000 characters'; 