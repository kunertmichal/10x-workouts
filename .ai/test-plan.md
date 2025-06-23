# Plan testów dla projektu 10x-workouts

## 1. Wprowadzenie i cele testowania

Celem testowania jest zapewnienie wysokiej jakości, niezawodności oraz wydajności aplikacji. Testy mają za zadanie zweryfikować poprawność działania interfejsu, logiki aplikacji oraz integracji z backendem (Supabase), jednocześnie dbając o spójność stylów UI i kompatybilność między różnymi przeglądarkami. Kluczowym celem jest szybkie wykrycie błędów oraz zapewnienie stabilności aplikacji przed wdrożeniem na środowisko produkcyjne.

## 2. Zakres testów

- Testy komponentów interfejsu użytkownika (UI) – sprawdzenie poprawności renderowania elementów, interakcji oraz responsywności.
- Testy logiki biznesowej – weryfikacja działania funkcji, walidacji danych, procesów autoryzacji i komunikacji z API Supabase.
- Testy integracyjne – sprawdzenie współdziałania poszczególnych modułów, m.in. uwierzytelnianie, zarządzanie profilem, generacja workoutów.
- Testy end-to-end (E2E) – symulacja pełnych scenariuszy użytkownika, takich jak logowanie, rejestracja, tworzenie oraz przegląd treningów.
- Testy regresji – systematyczne uruchamianie testów przy każdej zmianie, aby upewnić się, że nowe modyfikacje nie wpływają negatywnie na istniejącą funkcjonalność.
- Testy mockowania API – weryfikacja poprawnej komunikacji z zewnętrznymi serwisami poprzez symulację odpowiedzi API.

## 3. Typy testów do przeprowadzenia

- **Testy jednostkowe:**
  - Walidacja logiki funkcji, metod i komponentów React.
  - Testy poszczególnych modułów (np. funkcje utilów, walidatory, komponenty formularzy).
- **Testy integracyjne:**
  - Testy interakcji między komponentami UI a backendem.
  - Weryfikacja komunikacji z bazą danych poprzez API Supabase.
- **Testy end-to-end (E2E):**
  - Symulacja rzeczywistych ścieżek użytkownika, takich jak proces logowania, edycja profilu czy generacja workoutu.
- **Testy UI/akceptacyjne:**
  - Testowanie zgodności interfejsu z projektem graficznym i sprawdzanie elementów dostępności.
- **Testy mockowania API:**
  - Weryfikacja obsługi różnych odpowiedzi API oraz symulacja błędów połączenia.

## 4. Scenariusze testowe dla kluczowych funkcjonalności

- **Uwierzytelnianie i autoryzacja:**
  - Rejestracja użytkownika.
  - Logowanie i wylogowanie.
  - Potwierdzanie adresu e-mail.
- **Zarządzanie profilem:**
  - Wyświetlanie danych profilu.
  - Edycja i aktualizacja informacji o użytkowniku.
- **Moduł workout:**
  - Generacja plany treningowe.
  - Edycja i przeglądanie szczegółów treningu.
  - Walidacja danych wejściowych w formularzach.
- **Interakcja z UI:**
  - Poprawne działanie komponentów takich jak przyciski, formularze, alerty.
  - Testy responsywności oraz poprawnego renderowania w różnych przeglądarkach.
- **Integracja z backendem:**
  - Testowanie komunikacji z API Supabase (odczyt, zapis oraz autoryzacja danych).
  - Symulacja błędów połączenia i odpowiednie obsłużenie wyjątków.
- **Integracja z AI (Openrouter.ai):**
  - Mockowanie odpowiedzi API dla stabilnych testów.
  - Weryfikacja obsługi błędów komunikacji z zewnętrznym API.

## 5. Środowisko testowe

- **Środowiska:**
  - Środowisko developerskie i stagingowe oddzielone od produkcji.
  - Użycie kontenerów (Docker) do symulacji backendu i API.
- **Przeglądarki:**
  - Testy na popularnych przeglądarkach: Chrome, Firefox, Safari.
- **Konfiguracja:**
  - Baza danych z próbnym zestawem danych generowanych przez @faker-js/faker.
  - MSW do mockowania wszystkich zewnętrznych API (Supabase, Openrouter.ai).

## 6. Narzędzia do testowania

- **Frameworki testowe:**
  - Vitest i React Testing Library do testów jednostkowych oraz integracyjnych.
  - Playwright do testów end-to-end.
- **Mockowanie i dane testowe:**
  - MSW (Mock Service Worker) do mockowania API requests.
  - @faker-js/faker do generowania danych testowych.
- **Analiza statyczna:**
  - ESLint i TypeScript dla utrzymania wysokiej jakości kodu.
- **CI/CD:**
  - GitHub Actions do automatycznego uruchamiania testów przy commitach.
- **Zarządzanie błędami:**
  - System śledzenia błędów (GitHub Issues, JIRA) do raportowania i monitorowania usterek.

## 7. Harmonogram testów

- **Faza planowania:**
  - Określenie wymagań testowych, konfiguracja środowisk i wybór narzędzi.
- **Faza implementacji testów:**
  - Tworzenie testów jednostkowych i integracyjnych równolegle podczas developmentu.
- **Faza testów E2E:**
  - Przeprowadzenie testów po ukończeniu kluczowych funkcjonalności.
- **Faza regresji:**
  - Regularne uruchamianie testów w ramach automatycznego pipeline’u CI.
- **Optymalizacja testów:**
  - Refaktoryzacja i poprawa wydajności testów w miarę rozwoju projektu.

## 8. Kryteria akceptacji testów

- Pokrycie testami minimum 80% krytycznych modułów.
- Wszystkie testy jednostkowe i integracyjne muszą zakończyć się sukcesem.
- Testy E2E muszą przejść bez krytycznych błędów.
- Brak błędów o wysokim priorytecie zgłoszonych podczas testów regresyjnych.
- Zatwierdzenie wyników testów przez zespół QA przed wdrożeniem na produkcję.

## 9. Role i odpowiedzialności

- **Inżynierowie QA:**
  - Projektowanie i implementacja testów.
  - Przygotowywanie środowisk testowych oraz monitorowanie wyników.
- **Programiści:**
  - Tworzenie i utrzymanie kodu oraz testów jednostkowych.
  - Współpraca przy naprawie wykrytych usterek.
- **Menedżerowie projektu:**
  - Nadzór nad harmonogramem oraz koordynacja pomiędzy zespołami.
- **DevOps/CI/CD:**
  - Utrzymywanie pipeline’u oraz automatyzacja uruchamiania testów.

## 10. Procedury raportowania błędów

- **Zgłaszanie:**
  - Każdy napotkany błąd należy zgłosić w systemie śledzenia (GitHub Issues lub JIRA) z dokładnym opisem, krokami do reprodukcji oraz, jeśli to możliwe, zrzutami ekranu.
- **Priorytetyzacja:**
  - Błędy klasyfikowane są według ich wpływu na użytkownika i krytyczności funkcjonalności.
- **Weryfikacja:**
  - Codzienne lub cotygodniowe przeglądy zgłoszonych błędów z udziałem inżynierów QA i programistów.
- **Komunikacja:**
  - Szybkie informowanie odpowiedzialnych zespołów o krytycznych błędach w celu natychmiastowej reakcji.
