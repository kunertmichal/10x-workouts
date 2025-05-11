# Plan implementacji widoku WorkoutRun

## 1. Przegląd

Widok WorkoutRun prowadzi użytkownika przez trening. Wyświetla aktualnie wykonywane ćwiczenie, zarządza odliczaniem czasu lub liczbą powtórzeń oraz obsługuje przerwy między seriami. Komponent jest prezentowany jako modalny dialog wywoływany ze szczegółów treningu.

## 2. Routing widoku

Komponent dostępny jest w ramach `/app/workouts/[id]` jako część widoku `WorkoutView`, wyświetlany w formie modalu.

## 3. Struktura komponentów

W aktualnej implementacji struktura została uproszczona i cała logika znajduje się w komponencie `WorkoutRun`:

```
WorkoutRun
 └── SetIndicator (wyświetla numer serii)
```

- Pasek postępu, grafika ćwiczenia oraz kontrolki są zintegrowane w jednym komponencie.

## 4. Szczegóły komponentu WorkoutRun

- Opis: Główny komponent modalny zarządzający przebiegiem treningu.
- Główne elementy UI: Dialog, DialogContent, DialogHeader, DialogTitle, Card (z CardHeader, CardContent, CardFooter), Progress.
- Obsługiwane interakcje:
  - Zamknięcie modalu (`handleClose`)
  - Pauza/wznowienie treningu (`toggleTimer`)
  - Przejście do następnego ćwiczenia (`handleNext`)
  - Powrót do poprzedniego ćwiczenia (`handlePrevious`)
  - Reset treningu (`handleRepeat`)
  - Przełączanie audio (`handleAudioMute`)

## 5. Typy

```typescript
interface WorkoutRunProps {
  workout: Workout;
  isRunning: boolean;
  setIsRunning: (isRunning: boolean) => void;
}
```

Stan wewnętrzny (local state) komponentu zarządza następującymi właściwościami:

```typescript
{
  isAudioMuted: boolean;
  exerciseIndex: number;
  isTimerRunning: boolean;
  timeLeft: number;
}
```

Dane ćwiczeń są przekształcane przez funkcję `transformExercises`, która:

- Przekształca oryginalną strukturę (w tym przerwy) na listę ćwiczeń
- Ustawia właściwości serii: `setNumber` i `totalSets`

## 6. Zarządzanie stanem

W odróżnieniu od pierwotnego planu, rezygnujemy z custom hooków (`useWorkoutFlow` i `useWorkoutTimer`). Zarządzanie stanem odbywa się bezpośrednio w komponencie `WorkoutRun` przy użyciu `useState` oraz `useEffect` do obsługi odliczania czasu.

## 7. Integracja API

Trening otrzymujemy poprzez props (`workout`), więc nie zachodzi potrzeba bezpośredniej integracji z API.

## 8. Interakcje użytkownika

1. Rozpoczęcie treningu:

   - Uruchomienie modalu przez kliknięcie przycisku "Run" w widoku szczegółów.

2. Podczas treningu:

   - Pauza/wznowienie treningu za pomocą przycisku (`toggleTimer`).
   - Nawigacja między ćwiczeniami (`handleNext` i `handlePrevious`).
   - Reset treningu (`handleRepeat`) – aktywowany, gdy bieżący timer został zmodyfikowany.
   - Przełączanie dźwięku (`handleAudioMute`).

3. Zakończenie treningu:
   - Automatyczne po wykonaniu wszystkich ćwiczeń lub ręczne zakończenie przez użytkownika,
   - Zamknięcie modalu (`handleClose`), które resetuje stan treningu.

## 9. Warunki i walidacja

- Warunki przejścia między ćwiczeniami:
  - Aktualizacja indeksu ćwiczenia oraz reset timera musi przebiegać zgodnie z logiką w handlerach.
- Warunki zakończenia treningu:
  - Wykonanie wszystkich ćwiczeń lub ręczne zakończenie przez użytkownika.
- Dodatkowa walidacja obejmuje resetowanie stanu przy zamknięciu modalu.

## 10. Obsługa błędów

- Sprawdzenie kompletności danych treningu przed rozpoczęciem.
- Obsługa problemów z timerem, takich jak potencjalna desynchronizacja odliczania.
- Reset stanu przy zamknięciu modalu, aby zapobiec nieprawidłowym zachowaniom.

## 11. Kroki implementacji

1. Utworzenie podstawowej struktury komponentu `WorkoutRun` z modalem.
2. Implementacja logiki przekształcania ćwiczeń poprzez funkcję `transformExercises`.
3. Zarządzanie stanem treningu przy użyciu `useState` i `useEffect` – rezygnacja z custom hooków.
4. Implementacja event handlerów:
   - `handleNext` i `handlePrevious` do nawigacji między ćwiczeniami,
   - `toggleTimer` do pauzy/wznowienia,
   - `handleClose` dla zamknięcia modalu,
   - `handleRepeat` dla resetu treningu,
   - `handleAudioMute` dla przełączania audio.
5. Integracja elementów UI z użyciem komponentów biblioteki Shadcn/ui (Dialog, Card, Progress).
6. Kalkulacja postępu treningu przy użyciu funkcji `calculateProgress`.
7. Implementacja efektu odliczania timera za pomocą `useEffect`.
8. Testowanie interakcji oraz walidacji logiki treningu.
9. Finalizacja dokumentacji i optymalizacja wydajności.
