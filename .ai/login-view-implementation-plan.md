# Plan implementacji widoku Logowanie

## 1. Przegląd

Widok "Logowanie" służy do autoryzacji użytkownika poprzez wprowadzenie adresu email i hasła. Umożliwia dostęp do zabezpieczonych danych oraz personalizowanych treści po poprawnej autoryzacji. Widok integruje się z funkcjami logowania i rejestracji dostarczonymi w pliku `src/app/login/actions.ts`.

## 2. Routing widoku

Widok będzie dostępny pod ścieżką `/login`.

## 3. Struktura komponentów

- **LoginPage** – Strona główna widoku, która zawiera nagłówek oraz komponent formularza logowania.
  - Renderuje komponent **LoginForm**.
- **LoginForm** – Główny formularz logowania zawierający:
  - Pole input dla adresu email
  - Pole input dla hasła
  - Przyciski: "Login" i "Sign up"
  - Sekcję wyświetlania komunikatów błędów
- (Opcjonalnie) Wykorzystanie komponentów **Input** i **Button** z biblioteki Shadcn/ui do budowy UI.

## 4. Szczegóły komponentów

### LoginPage

- Opis: Kontener widoku logowania, odpowiedzialny za renderowanie głównego formularza oraz zapewnienie spójnego layoutu.
- Główne elementy: Nagłówek, opis oraz komponent **LoginForm**.
- Obsługiwane interakcje: Przekazanie akcji submit do komponentu **LoginForm**.
- Obsługiwana walidacja: Brak specyficznej walidacji na poziomie strony.
- Typy/Propsy: Nie wymaga dodatkowych typów ani propsów.

### LoginForm

- Opis: Komponent odpowiedzialny za zbieranie danych logowania, walidację oraz wywołanie akcji logowania lub rejestracji.
- Główne elementy:
  - Dwa pola input (email, hasło)
  - Dwa przyciski: "Login" i "Sign up"
  - Sekcja do wyświetlania komunikatów błędów
- Obsługiwane interakcje:
  - Zmiana wartości inputów (onChange)
  - Walidacja danych przy zdarzeniach onBlur i przy submit
  - Akcja submit formularza, która wywołuje funkcję `login` lub `signup` z `src/app/login/actions.ts`
- Warunki walidacji:
  - Sprawdzenie, czy oba pola (email i hasło) nie są puste
  - Walidacja formatu adresu email (np. przy użyciu wyrażenia regularnego)
- Typy:
  - DTO: `AuthDTO` { email: string; password: string }
- Propsy: Ewentualny callback onSuccess, jeśli logika wymaga dodatkowego przekazywania stanu do rodzica.

## 5. Typy

- **AuthDTO**:
  - email: string
  - password: string

## 6. Zarządzanie stanem

- Wykorzystanie hooków React Hook Form do zarządzania stanem pól email, hasła, błędów oraz flagą ładowania.

## 7. Integracja API

- Wywołanie funkcji `login(formData: FormData)` lub `signup(formData: FormData)` z pliku `src/app/login/actions.ts` po walidacji danych.
- Przekazywanie danych formularza do endpointu jako obiekt FormData z kluczami "email" i "password".
- Obsługa odpowiedzi API:
  - W przypadku sukcesu następuje rewalidacja strony i przekierowanie do `/workouts`.

## 8. Interakcje użytkownika

- Wprowadzanie danych: Użytkownik wpisuje adres email i hasło.
- Kliknięcie przycisku "Login":
  - Formularz weryfikuje, czy pola nie są puste oraz czy email ma poprawny format.
  - Po poprawnej walidacji dane są przesyłane do funkcji `login`.
- Kliknięcie przycisku "Sign up":
  - Formularz przesyła dane do funkcji `signup` w celu utworzenia nowego konta.
- Wyświetlanie komunikatów błędów: W przypadku nieprawidłowych danych lub błędów z API, użytkownik otrzymuje odpowiednią informację.
- Obsługa nawigacji klawiaturowej oraz czytelne etykiety zapewniające dostępność widoku.

## 9. Warunki i walidacja

- Wykorzystanie biblioteki Zod do walidacji danych.
- Walidacja obecności danych: Upewnienie się, że pola email i hasło nie są puste.
- Walidacja formatu email: Sprawdzenie, czy wprowadzony adres email spełnia standardowy format (np. za pomocą regex).
- Dane przekazywane do API muszą być typu FormData z kluczami "email" i "password".
- W przypadku błędów walidacji, wyświetlenie komunikatów błędów bez wysyłania danych do API.

## 10. Obsługa błędów

- Błędy walidacji: Natychmiastowe wyświetlanie komunikatu błędu pod odpowiednim polem input.
- Błędy API: W przypadku wystąpienia błędu, komunikat "Invalid credentials" powinien być wyświetlony inline przy polach formularza, ustawiając flagę błędu w stanie komponentu bez przekierowywania użytkownika.
- Użycie konstrukcji try/catch w logice submit, aby wychwycić nieoczekiwane błędy.

## 11. Kroki implementacji

1. Utworzenie strony widoku w pliku `src/pages/login.tsx`.
2. Implementacja komponentu **LoginPage**, który importuje i renderuje komponent **LoginForm**.
3. Utworzenie komponentu **LoginForm** w pliku `src/components/LoginForm.tsx` z wykorzystaniem React Hook Form lub useState do zarządzania stanem formularza.
4. Wykorzystanie komponentów z biblioteki Shadcn/ui do stworzenia pól input oraz przycisków.
5. Dodanie logiki walidacji: sprawdzenie obecności danych oraz walidacja formatu email.
6. Integracja z endpointami `login` i `signup` z pliku `src/app/login/actions.ts` poprzez przesłanie danych formularza jako FormData.
7. Obsługa stanów: ustawienie flagi ładowania (isLoading) oraz błędu (error) w stanie komponentu.
