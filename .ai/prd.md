# Dokument wymagań produktu (PRD) - 10xWorkouts

## 1. Przegląd produktu

Aplikacja 10xWorkouts wspiera użytkowników w tworzeniu spersonalizowanych planów treningowych, umożliwiając zarówno manualne tworzenie treningów (CRUD), jak i generowanie treningów przez AI. System wykorzystuje nowoczesny stos technologiczny: Next 15, TypeScript 5, React 19, Tailwind 4 oraz Shadcn/ui. Dane profilowe użytkownika (wiek, waga, dostępny sprzęt, cel treningowy) są wykorzystywane do generowania treningów dopasowanych do indywidualnych potrzeb.

## 2. Problem użytkownika

- Użytkownicy często nie potrafią planować treningów ze względu na brak kompetencji, czasu lub kreatywności.
- Użytkownicy mają trudności z dostosowaniem treningu do swojego aktualnego stanu fizycznego.
- Brak prostego i intuicyjnego narzędzia łączącego możliwość ręcznego tworzenia treningów z opcją generowania treningów przez AI.

## 3. Wymagania funkcjonalne

1. Wprowadzenie danych profilowych:

   - Użytkownik wprowadza dane takie jak wiek, waga, dostępny sprzęt oraz cel treningowy.

2. Tryby tworzenia treningu:

   - Tryb manualny: umożliwia pełną funkcjonalność CRUD dla treningów, włączając szczegółową konfigurację ćwiczeń, liczbę serii, typ serii (czas lub powtórzenia) oraz długość przerw (gdzie przerwa traktowana jest jako ćwiczenie aby uprościć logikę). Trening zapisywany jest w bazie danych jako pole JSONB, dzięki czemu uprości to implementację.
   - Tryb generowany przez AI: system generuje trening na podstawie danych profilowych, a użytkownik może zaakceptować lub odrzucić wygenerowany trening, lub zmodyfikować go w dowolny sposób.

3. Walidacja treningu wygenerowanego przez AI:

   - System weryfikuje, czy trening korzysta wyłącznie z zatwierdzonych unikalnych identyfikatorów ćwiczeń, pobieranych z dynamicznie aktualizowanego pliku TypeScript.
   - W przypadku niepowodzenia walidacji, system podejmuje maksymalnie 3 próby, gdzie każda trwa do 60 sekund.

4. Integracja z LLM:

   - Generacja treningów odbywa się wyłącznie za pośrednictwem openrouter.

5. Logowanie generacji treningów:

   - Wyniki generacji są logowane w tabeli "generations" w bazie danych z kolumnami: prompt, answer, is_valid oraz is_accepted.

6. Interfejs użytkownika:
   - Wyświetlanie bieżącego ćwiczenia, numeru serii oraz ogólnego progresu treningu w czasie rzeczywistym.

## 4. Granice produktu

- Nie obejmuje funkcjonalności:
  - Dodawanie treningów do kalendarza.
  - Dodawanie treningów do ulubionych.
  - Generowanie planów treningowych.
  - Zapisywanie postępów treningowych jak obciążenie, czas, powtórzenia, serie itp.

## 5. Historyjki użytkowników

ID: US-001
Tytuł: Wprowadzenie danych profilowych
Opis: Użytkownik wprowadza dane profilowe (wiek, waga, dostępny sprzęt, cel treningowy) w celu otrzymania spersonalizowanego treningu generowanego przez AI.

Kryteria akceptacji:

- Formularz umożliwia wprowadzenie wszystkich wymaganych danych.
- System poprawnie zapisuje i wykorzystuje dane do generowania treningu.

ID: US-002
Tytuł: Tworzenie treningu manualnie
Opis: Użytkownik tworzy trening manualnie, wybierając ćwiczenia, określając liczbę serii, typ serii (czas lub powtórzenia) oraz konfigurując długość przerw, gdzie przerwa traktowana jest jako ćwiczenie.

Kryteria akceptacji:

- Użytkownik ma możliwość tworzenia, edytowania, odczytywania oraz usuwania treningów.
- Interfejs umożliwia szczegółową konfigurację każdego elementu treningu.

ID: US-003
Tytuł: Generowanie treningu przez AI
Opis: Użytkownik wybiera tryb generowany przez AI, gdzie system na podstawie danych profilowych tworzy propozycję treningu.

Kryteria akceptacji:

- Proces generacji rozpoczyna się na żądanie użytkownika.
- System prezentuje wygenerowany trening do akceptacji lub odrzucenia.

ID: US-004
Tytuł: Akceptacja/Odrzucenie treningu AI
Opis: Po wygenerowaniu treningu przez AI, użytkownik decyduje, czy zapisuje zaproponowany trening, czy wymaga kolejnej próby generacji.

Kryteria akceptacji:

- Opcje akceptacji i odrzucenia są wyraźnie przedstawione.
- System reaguje zgodnie z wyborem użytkownika, umożliwiając kolejne próby w przypadku odrzucenia.

ID: US-005
Tytuł: Mechanizm walidacji treningu AI
Opis: System waliduje trening wygenerowany przez AI, sprawdzając, czy wykorzystuje on zatwierdzone unikalne identyfikatory ćwiczeń.

Kryteria akceptacji:

- Walidacja odbywa się przy użyciu najnowszych danych z dynamicznie aktualizowanego pliku TypeScript.
- W przypadku niepowodzenia walidacji, system podejmuje do 3 prób generacji, każda trwająca do 60 sekund.

ID: US-006
Tytuł: Uruchomienie treningu
Opis: Interfejs użytkownika wyświetla aktualne ćwiczenie, numer serii oraz ogólny progres treningu w czasie rzeczywistym.
Kryteria akceptacji:

- Informacje o bieżącym ćwiczeniu, numerze serii i progresie są widoczne i aktualizowane na bieżąco.

ID: US-007
Tytuł: Bezpieczny dostęp i uwierzytelnianie
Opis: Użytkownik loguje się do systemu, co umożliwia bezpieczny dostęp do danych treningowych oraz personalizowanych planów treningowych.

Kryteria akceptacji:

- System implementuje mechanizmy logowania i uwierzytelniania.
- Użytkownik uzyskuje dostęp do swojej historii treningów i danych tylko po poprawnym zalogowaniu.

## 6. Metryki sukcesu

- Co najmniej 75% użytkowników akceptuje treningi generowane przez AI.
- Proces generacji treningu nie przekracza 60 sekund na próbę i obejmuje maksymalnie 3 próby.
- System poprawnie loguje wyniki generacji w tabeli "generations" (prompt, answer, is_valid, is_accepted).
- Interfejs użytkownika poprawnie wyświetla aktualne ćwiczenie, numer serii oraz ogólny progres treningu.
- Funkcjonalność CRUD w trybie manualnym działa bezbłędnie, umożliwiając pełną kontrolę nad tworzeniem i modyfikacją treningów.
