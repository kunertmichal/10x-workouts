# Architektura UI dla [Nazwa produktu]

## 1. Przegląd struktury UI

- Interfejs aplikacji jest projektowany jako responsywny system, dostosowany do urządzeń desktop, tablet i mobile.
- Warstwa autoryzacji chroni całą aplikację i udostępnia dostęp do widoków tylko zalogowanym użytkownikom.
- Logika biznesowa opiera się na zarządzaniu stanem przy użyciu Zustand, przy czym stan UI jest kontrolowany lokalnie w komponentach.
- Interakcje z API realizowane są poprzez wyznaczone endpointy, co pozwala na pełne operacje CRUD dotyczące treningów oraz generacji.

## 2. Lista widoków

### Ekran logowania

- Ścieżka widoku: `/login`
- Główny cel: Autoryzacja użytkownika przy użyciu e-maila i hasła (integracja z Supabase Auth).
- Kluczowe informacje: Formularz logowania, komunikaty błędów walidacji.
- Kluczowe komponenty: Formularz logowania, inputy, przycisk logowania oraz rejestracji.
- Uwagi UX/dostępność: Widoczne komunikaty błędów, nawigacja klawiaturowa, czytelne etykiety.

### Profil użytkownika

- Ścieżka widoku: `/profile`
- Główny cel: Wyświetlanie i edycja danych profilu (data urodzenia, waga, cele treningowe, ekwipunek).
- Kluczowe informacje: Aktualne dane profilu, formularz edycji, przycisk zapisu.
- Kluczowe komponenty: Formularz edycji, widok danych, AlertDialog przy opuszczaniu niezapisanych zmian.
- Uwagi UX/dostępność: Walidacja formularza z inline komunikatami błędów, dostępność nawigacji.

### Lista treningów

- Ścieżka widoku: `/workouts`
- Główny cel: Prezentacja listy treningów użytkownika.
- Kluczowe informacje: Lista treningów, opcje filtrowania (np. wyszukiwanie po nazwie) i sortowania.
- Kluczowe komponenty: Lista kart treningowych, przyciski do edycji, usunięcia i uruchomienia treningu.
- Uwagi UX/dostępność: Informacje o stanie ładowania, komunikaty błędów, responsywność elementów listy.

### Szczegóły treningu

- Ścieżka widoku: `/workouts/:id`
- Główny cel: Prezentacja szczegółowych informacji o wybranym treningu.
- Kluczowe informacje: Lista ćwiczeń, informacje o czasie dla serii z timerem lub ilość powtórzeń dla każdej serii.
- Kluczowe komponenty: Lista ćwiczeń, przyciski nawigacyjne, przyciski do edycji/uruchomienia.
- Uwagi UX/dostępność: Czytelna prezentacja danych, możliwość szybkiej edycji lub usunięcia treningu, inline komunikaty błędów.

### Widok treningu w trakcie wykonywania

- Ścieżka widoku: `/workouts/:id/run`
- Główny cel: Kierowanie użytkownika podczas wykonywania treningu poprzez timer lub mechanizm "Next".
- Kluczowe informacje: Aktualny etap treningu, informacja o czasie lub liczbie powtórzeń.
- Kluczowe komponenty: Timer lub przycisk "Next", pasek postępu, widok zmieniających się ćwiczeń.
- Uwagi UX/dostępność: Wyraźne stany ładowania/przerwy, potwierdzenia krytycznych akcji, dostępność dla osób z ograniczeniami ruchowymi.

### Kreator treningu

- Ścieżka widoku: `/workout-builder`
- Główny cel: Umożliwienie użytkownikowi stworzenia nowego treningu, w tym wykorzystanie generowania AI.
- Kluczowe informacje: Formularz do wpisywania danych treningu (nazwa, struktura jako JSON, źródło treningu), opcja generowania przy użyciu AI.
- Kluczowe komponenty: Formularz kreatora, przycisk generowania AI, przyciski zapisu i resetu, AlertDialog przy opuszczaniu niezapisanych zmian.
- Uwagi UX/dostępność: Walidacja danych, responsywność formularza, czytelne komunikaty o błędach.

## 3. Mapa podróży użytkownika

1. Użytkownik otwiera aplikację i widzi ekran logowania.
2. Po poprawnym zalogowaniu, użytkownik trafia do listy treningów.
3. Z listy treningów użytkownik wybiera trening, przechodząc do widoku szczegółów.
4. W widoku szczegółów użytkownik może:
   - Edytować lub usunąć trening.
   - Uruchomić trening, co przenosi do widoku treningu w trakcie wykonywania.
5. Użytkownik ma także dostęp do edycji swojego profilu z poziomu ekranu nawigacji (np. menu lub ikonki profilu).
6. W kreatorze treningu użytkownik może stworzyć nowy trening, z opcjonalnym generowaniem AI, a następnie zapisać trening i powrócić do listy treningów.
7. W przypadku opuszczania widoku z niezapisanymi zmianami, użytkownik otrzymuje potwierdzający dialog (AlertDialog).

## 4. Układ i struktura nawigacji

- Nawigacja główna dostępna z poziomu aplikacji (górny pasek menu) zawiera:
  - Pozycje: Lista treningów, Kreator treningu, Profil użytkownika, Wyloguj.
  - Mechanizm przekierowujący użytkownika do odpowiednich widoków.
- Przepływy specjalne (np. AlertDialog przy opuszczaniu widoku) zapewniają, że użytkownik świadomie wykonuje krytyczne akcje.
- Mechanizmy ochrony tras (route guards) zapewniają, że tylko zalogowani użytkownicy mają dostęp do widoków chronionych.

## 5. Kluczowe komponenty

- Formularz logowania: Składający się z pól e-mail, hasło oraz przycisku logowania.
- Formularz edycji profilu: Umożliwiający zmianę danych osobowych przy wsparciu walidacji inline.
- Karta treningu: Prezentacja podstawowych informacji o treningu oraz interakcji (edycja, usuwanie, uruchomienie).
- Lista ćwiczeń: Widok prezentacji sekwencji ćwiczeń, dostosowany do wariantów (timer lub powtórzenia).
- Kreator treningu: Interfejs umożliwiający tworzenie i modyfikację struktury treningu, w tym opcję generowania AI.
- Timer/Przycisk "Next": Komponent odpowiedzialny za kontrolowanie postępu treningu i przejście do następnego ćwiczenia.
- AlertDialog: Komponent wyświetlający potwierdzenie krytycznych akcji, takich jak usunięcie, opuszczenie edycji z niezapisanymi zmianami lub zakończenie treningu.
- Pasek nawigacji: Ułatwiający przemieszczanie się między widokami, obsługiwany przez mechanizmy routingu.
