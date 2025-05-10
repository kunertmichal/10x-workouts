# Plan implementacji widoku WorkoutRun

## 1. Przegląd

Widok WorkoutRun jest odpowiedzialny za prowadzenie użytkownika przez trening. Wyświetla aktualnie wykonywane ćwiczenie, zarządza czasem lub powtórzeniami oraz przerwami między seriami. Widok jest prezentowany jako dialog modalny, który można uruchomić z poziomu widoku szczegółów treningu.

## 2. Routing widoku

Widok jest komponentem modalnym, dostępnym w ramach `/app/workouts/[id]` jako część komponentu `WorkoutView`.

## 3. Struktura komponentów

```
WorkoutRun
├── WorkoutProgress
├── WorkoutExercise
│   ├── ExerciseTimer
│   └── ExerciseReps
└── WorkoutControls
```

## 4. Szczegóły komponentów

### WorkoutRun

- Opis komponentu: Główny komponent modalny zarządzający całym przebiegiem treningu
- Główne elementy: Dialog, DialogContent, DialogHeader, DialogTitle
- Obsługiwane interakcje:
  - Zamknięcie modalu
  - Pauza/wznowienie treningu
  - Zakończenie treningu
- Obsługiwana walidacja: N/A
- Typy: WorkoutRunProps
- Propsy:
  - workout: Workout
  - isRunning: boolean
  - setIsRunning: (isRunning: boolean) => void

### WorkoutProgress

- Opis komponentu: Pasek postępu pokazujący ogólny postęp treningu
- Główne elementy: Progress, Text
- Obsługiwane interakcje: N/A
- Obsługiwana walidacja: N/A
- Typy: WorkoutProgressProps
- Propsy:
  - currentExercise: number
  - totalExercises: number
  - progress: number

### WorkoutExercise

- Opis komponentu: Wyświetla aktualne ćwiczenie i zarządza jego przebiegiem
- Główne elementy: Card, Text, ExerciseTimer/ExerciseReps
- Obsługiwane interakcje:
  - Oznaczenie serii jako ukończonej (dla powtórzeń)
- Obsługiwana walidacja: N/A
- Typy: WorkoutExerciseProps
- Propsy:
  - exercise: Exercise
  - currentSet: number
  - onSetComplete: () => void

### ExerciseTimer

- Opis komponentu: Timer odliczający czas dla ćwiczeń czasowych
- Główne elementy: CircularProgress, Text
- Obsługiwane interakcje: N/A
- Obsługiwana walidacja: N/A
- Typy: ExerciseTimerProps
- Propsy:
  - duration: number
  - isPaused: boolean
  - onComplete: () => void

### WorkoutControls

- Opis komponentu: Panel kontrolny treningu
- Główne elementy: Button, IconButton
- Obsługiwane interakcje:
  - Pauza/wznowienie
  - Pominięcie ćwiczenia
  - Zakończenie treningu
- Obsługiwana walidacja: N/A
- Typy: WorkoutControlsProps
- Propsy:
  - isPaused: boolean
  - onPauseToggle: () => void
  - onSkip: () => void
  - onEnd: () => void

## 5. Typy

```typescript
interface WorkoutRunProps {
  workout: Workout;
  isRunning: boolean;
  setIsRunning: (isRunning: boolean) => void;
}

interface WorkoutState {
  currentExerciseIndex: number;
  currentSetIndex: number;
  timeRemaining: number;
  isBreak: boolean;
  isPaused: boolean;
  totalProgress: number;
}

interface ExerciseTimerProps {
  duration: number;
  isPaused: boolean;
  onComplete: () => void;
}

interface WorkoutProgressProps {
  currentExercise: number;
  totalExercises: number;
  progress: number;
}
```

## 6. Zarządzanie stanem

### useWorkoutFlow

Custom hook zarządzający stanem treningu:

- Śledzi aktualny indeks ćwiczenia i serii
- Zarządza przerwami między seriami
- Oblicza ogólny postęp treningu
- Obsługuje przejścia między ćwiczeniami

### useWorkoutTimer

Custom hook zarządzający timerem:

- Obsługuje odliczanie czasu
- Zarządza pauzą/wznowieniem
- Wywołuje callback po zakończeniu odliczania

## 7. Integracja API

Widok nie wymaga bezpośredniej integracji z API. Wszystkie potrzebne dane są przekazywane przez props z komponentu nadrzędnego.

## 8. Interakcje użytkownika

1. Uruchomienie treningu:

   - Kliknięcie przycisku "Run" w widoku szczegółów treningu
   - Otwarcie modalu z pierwszym ćwiczeniem

2. Podczas treningu:

   - Pauza/wznowienie treningu
   - Oznaczanie ukończonych serii (dla ćwiczeń na powtórzenia)
   - Automatyczne przejście do następnej serii/ćwiczenia (dla ćwiczeń czasowych)
   - Możliwość pominięcia ćwiczenia
   - Możliwość zakończenia treningu

3. Zakończenie treningu:
   - Automatyczne po wykonaniu wszystkich ćwiczeń
   - Ręczne przez użytkownika
   - Zamknięcie modalu

## 9. Warunki i walidacja

1. Warunki przejścia między ćwiczeniami:

   - Wszystkie serie muszą być ukończone
   - Przerwy między seriami muszą się zakończyć

2. Warunki zakończenia treningu:
   - Wszystkie ćwiczenia zostały wykonane
   - Użytkownik ręcznie zakończył trening

## 10. Obsługa błędów

1. Nieprawidłowe dane treningu:

   - Sprawdzenie kompletności danych przed uruchomieniem
   - Wyświetlenie komunikatu o błędzie

2. Problemy z timerem:

   - Obsługa desynchronizacji
   - Automatyczna korekcja przy wznowieniu

3. Nieoczekiwane zamknięcie:
   - Potwierdzenie przed zamknięciem
   - Zachowanie postępu

## 11. Kroki implementacji

1. Utworzenie podstawowej struktury komponentu WorkoutRun
2. Implementacja custom hooka useWorkoutFlow
3. Implementacja custom hooka useWorkoutTimer
4. Utworzenie komponentu WorkoutProgress
5. Utworzenie komponentu WorkoutExercise
6. Implementacja wariantów ExerciseTimer i ExerciseReps
7. Utworzenie komponentu WorkoutControls
8. Integracja wszystkich komponentów
9. Implementacja logiki przejść między ćwiczeniami
10. Dodanie obsługi błędów i walidacji
11. Implementacja animacji i przejść
12. Testy jednostkowe i integracyjne
13. Optymalizacja wydajności
14. Dodanie dokumentacji
