# Schemat bazy danych

## 1. Tabele i kolumny

### Users

Ta tabela jest zarządzana przez Supabase Auth.

### Profiles

- `user_id`: UUID PRIMARY KEY
- `birthday`: DATE
- `weight`: NUMERIC
- `training_goals`: TEXT
- `equipment`: TEXT[]
- `created_at`: TIMESTAMPTZ NOT NULL DEFAULT NOW()
- `updated_at`: TIMESTAMPTZ NOT NULL DEFAULT NOW()

### Workouts

- `id`: UUID PRIMARY KEY
- `owner`: UUID NOT NULL REFERENCES Profiles(user_id) ON DELETE CASCADE
- `name`: TEXT NOT NULL
- `structure`: JSONB NOT NULL, CHECK (char_length(structure::text) <= 1000)
- `source`: workout_source NOT NULL, enum('manual', 'ai', 'ai-edited')
- `created_at`: TIMESTAMPTZ NOT NULL DEFAULT NOW()
- `updated_at`: TIMESTAMPTZ NOT NULL DEFAULT NOW()

### Generations

- `id`: UUID PRIMARY KEY
- `owner`: UUID NOT NULL REFERENCES Profiles(user_id) ON DELETE CASCADE
- `prompt`: TEXT NOT NULL, CHECK (char_length(prompt) <= 1000)
- `answer`: TEXT NOT NULL, CHECK (char_length(answer::text) <= 1000)
- `is_valid`: BOOLEAN NOT NULL
- `is_accepted`: BOOLEAN NOT NULL
- `created_at`: TIMESTAMPTZ NOT NULL DEFAULT NOW()
- `updated_at`: TIMESTAMPTZ NOT NULL DEFAULT NOW()

## 2. Relacje między tabelami

- Profiles (jeden) do Workouts (wiele): `Workouts.owner` odnosi się do `Profiles.user_id`.
- Profiles (jeden) do Generations (wiele): `Generations.owner` odnosi się do `Profiles.user_id`.

## 3. Indeksy

- Indeks na kolumnie `owner` w tabeli `Workouts`.
- Indeks na kolumnie `owner` w tabeli `Generations`.

## 4. Dodatkowe uwagi

- Schemat jest zgodny z normalizacją do trzeciej postaci normalnej (3NF).
- Ograniczenia długości pól są definiowane przy użyciu CHECK constraint.
- Użycie typu JSONB w tabeli Workouts umożliwia elastyczne przechowywanie struktury treningu.
- Indeksy na polu `owner` poprawiają wydajność zapytań filtrowanych po właścicielu.
- Reguły RLS zostały tymczasowo usunięte dla celów developmentu; w przyszłości zostaną włączone.
