# 🎣 FishingBuddy

**FishingBuddy** to kompleksowa aplikacja webowa dla wędkarzy, umożliwiająca zapisywanie swoich połowów, zarządzanie ulubionymi łowiskami oraz ekwipunkiem. Aplikacja posiada funkcje społecznościowe (dzielenie się publicznymi zdobyczami) oraz system statystyk profilowych.

## 🚀 Funkcjonalności

### 🌍 Łowiska (Spots)
* **Dodawanie miejscówek:** Zapisywanie lokalizacji z dokładnymi współrzędnymi geograficznymi.
* **Prywatność:** Możliwość oznaczania miejsc jako prywatne (widoczne tylko dla autora) lub publiczne.
* **Zdjęcia:** Dodawanie zdjęć lokacji.
* **Edycja:** Możliwość aktualizacji danych istniejącej miejscówki.

### 🐟 Dziennik Połowów (Catch Log)
* **Rejestracja połowu:** Zapisywanie gatunku, wagi, długości, daty i opisu.
* **Powiązania:** Łączenie połowu z konkretną lokacją oraz użytym sprzętem (wędka, przynęta).
* **Catch & Release:** Oznaczanie ryb wypuszczonych z powrotem do wody (specjalna odznaka "Released").
* **Zdjęcia:** Przesyłanie zdjęć złowionych ryb.
* **Moderacja:** Właściciel może edytować/usuwać swoje wpisy. Administrator może usuwać dowolne wpisy.

### 👤 Profil Użytkownika
* **Statystyki:** Liczba złowionych ryb, rekord życiowy (Max Weight), liczba dodanych miejscówek.
* **Ulubione miejsce:** Automatyczne wykrywanie najczęściej odwiedzanego łowiska.
* **Wirtualny Garaż (Gear):**
    * Dodawanie i przeglądanie wędek/kołowrotków (z marką, modelem i typem).
    * Dodawanie i przeglądanie przynęt (z opisem i typem: Natural/Artificial).
* **Role:** Rozróżnienie między zwykłym użytkownikiem (`Angler`) a administratorem (`Admin`).

---

## 🛠 Technologie

**Backend:**
* Java 17+
* Spring Boot 3
* Spring Security (JWT Authentication)
* Spring Data JPA (Hibernate)
* PostgreSQL
* Lombok

## 💡 Uzasadnienie doboru technologii
Projekt zrealizowałem w oparciu o nowoczesny stos technologiczny, kierując się chęcią poznania standardów panujących obecnie w branży IT oraz potrzebą stworzenia stabilnej i skalowalnej aplikacji.

* **Spring Boot** Pozwolił mi na szybką konfigurację projektu i skupienie się na logice biznesowej zamiast na infrastrukturze.
* Zdecydowałem się na **Reacta**, aby zbudować dynamiczną aplikację typu Single Page Application (SPA). Podział na komponenty ułatwił mi organizację kodu i jego ponowne wykorzystanie.
* **Vite:** Wybrałem to narzędzie zamiast Create-React-App ze względu na lepszy komfort pracy deweloperskiej.
* **PostgreSQL** gwarantuje integralność danych i jest standardem w projektach Java. Ze względu na silne powiązania między danymi, relacyjna baza danych była jest naturalnym wyborem.

**Frontend:**
* React (Vite)
* React Router
* CSS

---

## ⚙️ Wymagania wstępne

* **Java JDK 17** lub nowsza
* **Node.js** (v16+) oraz **npm**
* **PostgreSQL**

---

## 📥 Instrukcja Uruchomienia

### 1. Konfiguracja Bazy Danych
Uruchom PostgreSQL i stwórz nową bazę danych:
```sql
CREATE DATABASE fishing_db;
```
### 2. Konfiguracja Backendu

1. Przejdź do folderu z projektem backendowym.
2. Skonfiguruj plik `src/main/resources/application.properties`:
   ```properties
   spring.datasource.url=jdbc:postgresql://localhost:5432/fishing_db
   spring.datasource.username=twoj_user
   spring.datasource.password=twoje_haslo
   
   # Konfiguracja uploadu plików
   spring.servlet.multipart.max-file-size=10MB
   spring.servlet.multipart.max-request-size=10MB
   ```
3. Oraz uruchom projekt z poziomu IDE (Intellij IDEA)

### 3. Konfiguracja Frontendu

1. Przejdź do folderu z projektem frontendowym.
2. Zainstaluj zależności:
   ```bash
   npm install
   ```
3. Uruchom serwer deweloperski:
   ```bash
   npm run dev
   ```
   Aplikacja będzie dostępna pod adresem `http://localhost:3000`.

---

## 🐞 Rozwiązywanie typowych problemów

**1. Biały ekran przy dodawaniu połowu (`/catches/new`)**
* **Przyczyna:** Frontend nie może pobrać list słownikowych (gatunki, wędki), bo backend nie działa lub baza jest pusta.
* **Rozwiązanie:** Upewnij się, że backend działa na porcie 8080.

**2. Błąd 404 przy wyświetlaniu zdjęć**
* **Przyczyna:** Zdjęcia fizycznie nie istnieją w folderze `images/` lub folder ten jest w złym miejscu.
* **Rozwiązanie:** Przenieś folder `images` do katalogu głównego projektu backendowego (obok `src` i `pom.xml`).

**3. Nie mogę usunąć połowu**
* **Przyczyna:** Nie jesteś właścicielem wpisu ani Administratorem.
* **Rozwiązanie:** Zaloguj się na konto twórcy wpisu lub nadaj sobie rolę `ADMIN` w bazie danych.

---

## 🔐 Role i Uprawnienia

Aplikacja obsługuje role pobierane z bazy danych. Aby nadać użytkownikowi uprawnienia administratora, należy wykonać wpis w bazie danych (tabela `roles` i `user_roles`), np.:

```sql
-- Nadanie roli ADMIN istniejącemu użytkownikowi (przykład)
INSERT INTO roles (name) VALUES ('ADMIN');
-- Zakładając, że user o ID=1 to Twój użytkownik:
INSERT INTO user_roles (user_id, role_id) VALUES (1, (SELECT id FROM roles WHERE name = 'ADMIN'));
```

---

## Diagram ERD

![Diagram ERD](https://i.imgur.com/ysylhuE.png)

**Miłego wędkowania! 🎣**
