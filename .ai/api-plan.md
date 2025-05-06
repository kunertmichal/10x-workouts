# REST API Plan

## 1. Zasoby

- **Users**: Zarządzane przez Supabase Auth (nie wystawiane bezpośrednio przez API).
- **Profiles**: Odpowiada tabeli `Profiles`. Przechowuje dane profilu użytkownika (np. data urodzenia, waga, cele treningowe, wyposażenie).
- **Workouts**: Odpowiada tabeli `Workouts`. Przechowuje informacje o treningach, w tym nazwę, strukturę (JSONB) oraz źródło treningu (enum: 'manual', 'ai', 'ai-edited').
- **Generations**: Odpowiada tabeli `Generations`. Przechowuje dane dotyczące generacji treningów, w tym prompt, odpowiedź oraz flagi `is_valid` i `is_accepted`.
- **Exercises**: Odpowiada plikowi `exercises.ts`. Przechowuje dane dotyczące ćwiczeń, w tym nazwę, opis, grupy mięśniowe, itd.

## 2. Punkty końcowe

Poniżej przedstawiono przykładowe punkty końcowe dla każdego zasobu.

### Profiles

- **GET /api/profiles/:userId**

  - Opis: Pobranie szczegółów konkretnego profilu.
  - Ścieżka URL: `:userId` to identyfikator profilu (UUID).
  - Odpowiedź: Obiekt profilu.
  - Kody powodzenia: 200.
  - Kody błędów: 401, 403, 404, 500.

- **PUT /api/profiles/:userId**

  - Opis: Aktualizacja istniejącego profilu.
  - Ładunek żądania JSON: Aktualizowane pola profilu.
  - Odpowiedź: Zaktualizowany obiekt profilu.
  - Kody powodzenia: 200.
  - Kody błędów: 400, 401, 403, 404, 500.

### Workouts

- **GET /api/workouts**

  - Opis: Pobranie listy treningów z opcją filtrowania po nazwie
  - Parametry zapytania: `name`
  - Odpowiedź: Lista obiektów treningowych.
  - Kody powodzenia: 200.
  - Kody błędów: 401, 403, 500.

- **GET /api/workouts/:id**

  - Opis: Pobranie szczegółowych informacji o treningu.
  - Ścieżka URL: `:id` to identyfikator treningu (UUID).
  - Odpowiedź: Obiekt treningu.
  - Kody powodzenia: 200.
  - Kody błędów: 401, 403, 404, 500.

- **POST /api/workouts**

  - Opis: Utworzenie nowego treningu.
  - Ładunek żądania JSON:
    ```json
    {
      "name": "Workout Name",
      "structure": { ... },
      "source": "manual" // lub "ai", "ai-edited"
    }
    ```
  - Uwaga: Walidacja zapewnia, że tekstowa reprezentacja pola `structure` nie przekracza 1000 znaków.
  - Odpowiedź: Utworzony obiekt treningu.
  - Kody powodzenia: 201.
  - Kody błędów: 400, 401, 403, 500.

- **POST /api/workouts/generate**

  - Opis: Generuje trening przy użyciu AI. Użytkownik przesyła preferencje treningowe, a system wykorzystuje model AI do wygenerowania struktury treningu.
  - Odpowiedź: Utworzony obiekt treningu.
  - Kody powodzenia: 201.
  - Kody błędów: 400, 401, 403, 500.

- **PUT /api/workouts/:id**

  - Opis: Aktualizacja treningu.
  - Ładunek żądania JSON: Pola do aktualizacji, np. `name`, `structure`, `source`.
  - Odpowiedź: Zaktualizowany obiekt treningu.
  - Kody powodzenia: 200.
  - Kody błędów: 400, 401, 403, 404, 500.

- **DELETE /api/workouts/:id**

  - Opis: Usunięcie treningu.
  - Odpowiedź: Komunikat potwierdzający usunięcie.
  - Kody powodzenia: 200.
  - Kody błędów: 401, 403, 404, 500.

### Generations

- **GET /api/generations**

  - Opis: Pobranie listy rekordów generacji z filtrowaniem po właścicielu, paginacją i sortowaniem.
  - Parametry zapytania: `owner`, `page`, `limit`, `sort`.
  - Odpowiedź: Lista obiektów generacji.
  - Kody powodzenia: 200.
  - Kody błędów: 401, 403, 500.

- **GET /api/generations/:id**

  - Opis: Pobranie szczegółów rekordu generacji.
  - Ścieżka URL: `:id` to identyfikator rekordu (UUID).
  - Odpowiedź: Obiekt generacji.
  - Kody powodzenia: 200.
  - Kody błędów: 401, 403, 404, 500.

- **POST /api/generations**

  - Opis: Utworzenie nowego rekordu generacji (rezultat akcji AI lub interakcji użytkownika).
  - Ładunek żądania JSON:
    ```json
    {
      "prompt": "text, max 1000 znaków",
      "answer": "text, max 1000 znaków",
      "is_valid": boolean,
      "is_accepted": boolean
    }
    ```
  - Uwaga: Walidacja długości `prompt` i `answer` zgodnie z ograniczeniem bazy danych.
  - Odpowiedź: Utworzony obiekt rekordu generacji.
  - Kody powodzenia: 201.
  - Kody błędów: 400, 401, 403, 500.

- **PUT /api/generations/:id**

  - Opis: Aktualizacja rekordu generacji (np. zmiana flag `is_valid` lub `is_accepted`).
  - Ładunek żądania JSON: Pola do aktualizacji.
  - Odpowiedź: Zaktualizowany obiekt rekordu.
  - Kody powodzenia: 200.
  - Kody błędów: 400, 401, 403, 404, 500.

- **DELETE /api/generations/:id**
  - Opis: Usunięcie rekordu generacji.
  - Odpowiedź: Komunikat potwierdzający usunięcie.
  - Kody powodzenia: 200.
  - Kody błędów: 401, 403, 404, 500.

## 3. Uwierzytelnianie i autoryzacja

- Wszystkie punkty końcowe (z wyjątkiem tych związanych z autoryzacją w Supabase) wymagają autoryzacji.
- Błędy: W przypadku braku lub nieprawidłowego tokena zwracany jest status 401 (Unauthorized) lub 403 (Forbidden), jeśli użytkownik nie ma dostępu.

## 4. Walidacja i logika biznesowa

- **Walidacja danych wejściowych**:

  - Profiles: Walidacja podstawowych pól, zgodnie z modelem (np. prawidłowy format daty w `birthday`).
  - Workouts: Pole `name` jest wymagane, `structure` musi być poprawnym obiektem JSON o długości tekstowej nie przekraczającej 1000 znaków, a `source` musi być jedną z wartości: 'manual', 'ai', 'ai-edited'.
  - Generations: Pola `prompt` i `answer` są obowiązkowe i ograniczone do 1000 znaków, a `is_valid` oraz `is_accepted` muszą być wartościami logicznymi.

- **Logika biznesowa**:

  - Podczas operacji tworzenia lub aktualizacji, API weryfikuje, czy user jest zalogowany.
  - Wczesne wykrywanie błędów: W przypadku nieprawidłowych danych wejściowych lub braku autoryzacji API zwraca odpowiednie komunikaty błędów (np. 400, 401, 403, 404).
  - Dodatkowa logika dotycząca workflow generacji treningów (AI) mapowana jest na punkty końcowe dla `Generations`:
    - Użytkownik może wysłać zapytanie generujące trening, a system zapisuje wynik wraz z walidacją długości i stanami `is_valid`/`is_accepted`.

- **Wydajność i bezpieczeństwo**:
  - Indeksy na kolumnie `owner` w tabelach `Workouts` i `Generations` zapewniają szybkie filtrowanie wyników.
  - Stosowane są mechanizmy ograniczania szybkości (rate limiting) oraz walidacja JWT dla zwiększenia bezpieczeństwa.
  - Błędy są logowane, a odpowiedzi API zawierają przyjazne komunikaty dla użytkownika.

---

_Założenia_: W niektórych przypadkach przyjmujemy, że operacje zarządzania profilami są minimalne, a główna logika biznesowa skupia się na tworzeniu i zarządzaniu treningami oraz generacjami treningów. Integracja z Supabase Auth gwarantuje bezpieczeństwo operacji związanych z użytkownikami.
