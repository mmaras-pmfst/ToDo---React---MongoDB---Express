# Evidencija aktivnosti

## 06.11.2020.

| Pocetak | Kraj  |
| ------- | ----- |
| 14:15   | 18:00 |

### Kratki opis promjena

Definirani zahtjevi aplikacije.
Dovršena prva faza projekta.

## 06.01.2021

| Pocetak | Kraj  |
| ------- | ----- |
| 12:53   | 16.15 |

### Kratki opis promjena

##### Backend promjene:

- Inicijalizacija Express servera
- Spajanje na MongoDB bazu podataka
- Kreiranje modela User i Task
- Kreirane metode za validiranje logiranja i registriranja korisnika
  Korištenje paketa:
  ```javascript
  const Joi = require('@hapi/joi');
  ```
- Deklariranje ruta koje ce se koristiti

  - za login/registraciju: /api/user
  - za operacije nad zadatkom (taskom): /api/tasks
  - za mogucnosti admina: /api/admin

- Kreirana registracija i login korisnika

- Kreirane operacije nad zadatkom (taskom):
  - Dohvacanje svih taskova
    ```javascript
    router.get("/",async(req,res)=>{...})
    ```
  - Pregled jednog taska
    ```javascript
    router.get("/:id",async(req,res)=>{...})
    ```
  - Uredivanje jednog taska
    ```javascript
    router.put("/:id",async(req,res)=>{...})
    ```
  - Brisanje jednog taska
    ```javascript
    router.delete("/:id",async(req,res)=>{...})
    ```
  - Promjena "complete" vrijednosti jednog taska
    ```javascript
    router.put("/done/:id",async(req,res)=>{...})
    ```
  - Dodavanje novog zadatka (taska)
    ```javascript
    router.post("/new",async(req,res)=>{...})
    ```

## 09.01.2021

| Pocetak | Kraj  |
| ------- | ----- |
| 11:05   | 13:30 |

### Kratki opis promjena

##### Frontend promjene:

- Kreirane stranice i dizajn:

  - Pocetna stranica (MainPage.js)
  - Registracija korisnika (UserRegister.js)
  - Login korisnika (UserLogin.js)
  - Login admina (AdminLogin.js)
  - Stranica svih nedovrsenih zadataka (AllTasks.js)
  - Stranica svih dovrsenih zadataka (CompletedTasks.js)
  - Stranica za dodavanje novog zadatka (NewTask.js)

- Implementirana logika putanja (u App.js) koristeci
  ```javascript
  import {
    BrowserRouter as Router,
    Route,
    Switch,
    Link,
  } from 'react-router-dom';
  ```

## 07.02.2021

| Pocetak | Kraj  |
| ------- | ----- |
| 15:20   | 19:26 |

##### Povezani Frontend i Backend!

#### Frontend promjene:

- Kreiran servis (tasks.js) koji sadrži funckionalnosti(rute) rada nad zadacima

- AllTasks i CompletedTasks stranice:

  - Kreirana stanja i _UseEffect_ za dohvat zadataka
  - Dinamično kreiranje liste nedovršenih/dovršenih zadataka
  - Dodana 2 _PopUp_ prozora (jedan za pregled-ViewModal, drugi za izmjene odabranog zadatka-EditModal)
  - Omogućene _Backend_ funckije za brisanje, promjene stanja završenosti i druge promjene nad zadatkom

- NewTask stranica:
  - Omogućene _Backend_ funckije za kreiranje novog zadatka

## 08.02.2021

| Pocetak | Kraj  |
| ------- | ----- |
| 18:09   | 20:10 |

##### Nastavak povezivanja Frontend-a i Backend-a!

#### Backend promjene:

- Implementirano korištenje tokena koristeći _jwt_ paket

- Izbačeno korištenje _express-session_-a

- auth.js (rute za logiranje i registraciju):

  - stvaranje tokena koji sadrži korisničko ime i id korisnika

- tasks.js (rute za rad nad zadacima):
  - metoda za dohvaćanje tokena iz zaglavlja
  - dekodiranje tokena nad rutama za dohvaćanje svih zadataka prijavljenog korisnika, izmjene nad odabranim zadatkom, kreiranje novog zadatka

#### Frontend promjene:

- Kreiran servis (userAuth.js) koji sadrži funkcionalnosti (rute) za prijavu i registraciju korisnika

- Promjene nad servisom tasks.js:

  - dodana varijabla i funkcija za postavljanje tokena
  - postavljanje autorizacijskog zaglavlja za rute dohvata svih zadataka prijavljenog korisnika, kreiranje novog zadatka, uređivanje odabranog zadatka

- Stranice za prijavu i registraciju spremaju token i ime korisnika u _localStorage_

- Promjene u _useEffect_ metodi na stranicama AllTasks, CompletedTasks, NewTask:

  - dohvaćanje podataka iz _localStorage_-a
  - provjera postojanosti dohvaćenih podataka (ako ne povratak na rutu "/")
  - postavljanje varijable token koja se nalazi unutar servisa task.js

- Prikaz imena prijavljenog korisnika na AllTasks stranici

- Dodana mogućnost odjave i brisanja _localStorage_-a

## 09.02.2021

| Pocetak | Kraj  |
| ------- | ----- |
| 11:10   | 19:34 |

#### Backend promjene:

- Kreirana registriracija/prijava admin korisnika

- Kreirana ruta za dohvaćanje svih korisnika

#### Frontend promjene:

- Kreiran servis (users.js) koji sadrži funkcionalnosti (rute) za rad administracije nad korisnicima (trenutno samo dohvaćanje svih korisnika)

- Prethodno napravljena prijava i registracija za obične korisnike primjenjena na prijavu admin korisnika

- Kreirana stranica za izlistavanje svih korisnika (prikaz identičan izlistavanju zadataka prijavljenog korisnika)

- Izrađeni testovi za jedan zadatak:

  - ispisivanje naslova zadatka

  - testiranja događaja na botun za završetak zadatka

- Izrađeni testovi za _popUp_ modul:

  - ispisivanje _child_ elementa

  - testiranje vidljivosti modula

## 10.02.2021

| Pocetak | Kraj  |
| ------- | ----- |
| 12:20   | 15:58 |

#### Backend promjene:

- Izmjene nad modelom User kako bi se mogao koristiti _populate()_

- Rad nad adminovim funkcionalnostima:

  - Dohvaćanje svih korisnika sa ulogom _user_ i svih njihovih zadataka naredbom _populate()_

  - Napravljena ruta za izmjene nad podacima odabranog korisnika

  - Brisanje odabranog korisnika i svih njegovih zadataka

#### Frontend promjene:

- Mogućnost pregledavanja odabranog korisnika:

  - broj dovršenih zadataka
  - broj nedovršenih zadataka
  - ukupni broj zadataka

- Dodana metoda za brisanje odabranog korisnika u servis user.js

- Povezane akcije brisanja na botun uz odabranog korisnika

## 11.02.2021

| Pocetak | Kraj  |
| ------- | ----- |
| 13:53   | 17:07 |

#### Backend promjene:

- Male promjene u strukturi mapa i datoteka

- Dodani testovi za korisnika:
  - testiranje formata odgovora
  - testiranje broja korisnika u bazi
  - testiranje imena prvog korisnika
  - pravilno dodavanje novog korisnika
  - usporedba krivih lozinki prilikom registracije vraća poruku s greškom
  - provjera krive lozinke prilikom prijave korisnika vraća poruku s greškom

## 12.02.2021

| Pocetak | Kraj  |
| ------- | ----- |
| 10:47   | 15:08 |

#### Backend promjene:

- Promjene nad validacijom podataka za prijavu i registraciju

- Dodani testovi za zadatak:
  - testiranje dodavanja novog zadatka
  - testiranje vrijednosti opisa prvog zadatka
  - testiranje brisanja jednog zadatka

#### Frontend promjene:

- Ispis pogreške koju vraća validator iz Backend dijela za prijavu i registraciju

## 16.02.2021

| Pocetak | Kraj  |
| ------- | ----- |
| 11:13   | 12:10 |

#### Frontend promjene:

- Dodan _pop-up_ prozor kojim admin može mijenjati lozinku odabranog korisnika
- Spojene funkcionalnosti promjena nad korisnikom s Backend-om

#### Backend promjene:

- Prepravljena ruta za promjene nad korisnikom

## 23.02.2021

| Pocetak | Kraj  |
| ------- | ----- |
| 16:55   | 18:00 |

#### Frontend promjene:

- Dodan _search engine_ za pretraživanje. Korisnik može tražiti zadatke, a admin može tražiti korisnike
