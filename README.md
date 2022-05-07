# Projektne faze

- [x] - Opis projekta
- [ ] - Početna struktura aplikacije
- [ ] - Prototip
- [ ] - Konzultacije
- [ ] - Finalna verzija
- [ ] - Obrana projekta

## Opis projekta

Potrebno je napisati kratki opis projekta.
Opis mora sadržavati popis funkcionalnosti koje će biti implementirane (npr. "prijava korisnika", "unos novih poruka", "pretraživanje poruka po autoru" itd...)

## Početna struktura aplikacije

Potrebno je inicijalizirati početnu strukturu backend i frontend aplikacija.
Aplikacije moraju biti u odvojenim mapama koje su već inicijalizirane.
Ukoliko radite aplikaciju sa statičkim frontend sadržajem, onda u mapi mora biti izvorni kôd aplikacije

## Prototip

U ovoj fazi bi trebali imati "grubu" verziju svoje aplikacije. Ova verzija bi trebala imati implementirane osnovne funkcionalnosti koje su navedene u opisu projekta. Ne očekuje se da su implementirane SVE funkcionalnosti niti da su postojeće funkcionalnosti potpuno ispravne.

## Konzultacije

Nakon izrade prototipa potrebno se javiti nastavniku za termin konzultacija. Na konzultacijama ćete ukratko pokazati svoj prototip te će se po potrebi napraviti modifikacija početnih zahtjeva. Dovršeni projekti bez ove faze neće biti prihvaćeni.

## Finalna verzija

Nakon demonstracije prototipa možete nastaviti sa razvojem aplikacije i implementacijom svih funkcionalnosti. Prilikom razvoja potrebno je voditi dnevnik aktivnosti prema zadanim uputama.

## Obrana projekta

Zadnja faza je obrana projekta - nakon završetka finalne verzije svoje aplikacije javite se nastavniku za dogovor oko termina obrane projekta.

# Opis projekta

## Kratki opis

To-do aplikacija za kreiranje, pregledavanje, brisanje, odrađivanje i uređivanje korisničkih zadataka. Početna stranica prikazuje zadatke koji nisu gotovi (samo naslov zadatka) i tri mogućnosti (brisanje, uređivanje i odrađivanje). Pritiskom na naslov zadatka prikazuje se detaljniji opis zadatka te vrijeme do kada zadatak treba biti izvršen. Završeni zadaci prikazuje se stranica gotovih zadataka na kojoj uz naslov gotovog zadatka postoje dvije mogućnosti (brisanje i vraćanje u zadatke u tijeku).
Osim korisnika postoji i admin profil koji ima uvid u popis korisnika te njihove podatke kao što su: ime korisnika, email, lozinka, broj zadataka u tijeku, broj gotovih zadataka te broj ukupno kreiranih zadataka. Uz to admin ima mogućnost mijenjanja lozinke korisnika (umijesto automatiziranog procesa forgotten password) i brisanje korisnika.

## Tehnologije

1. React
1. Express
1. MongoDB Atlas

## Popis funkcionalnosti

1. Korisnik:
   - Kreiranje zadataka (naslov, opis i datum/vrijeme)
   - Pregledavanje zadataka (prikaz naslova zadataka)
   - Pregledavanje detalja zadataka
   - Brisanje zadataka
   - Uređivanje zadataka
   - Odrađivanje zadataka
   - Pregled gotovih zadataka
   - Brisanje gotovih zadataka
   - Vraćanje gotovih zadataka u zadatke u tijeku
   - Tražilica po naslovu zadatka
   - Poredak zadataka prema vremenu kreiranja
1. Admin profil
   - Pregled korisnika (po korisničkim imenima)
   - Pregled podataka o korisnicima
   - Izmjena lozinke korisnika
   - Brisanje korisnika
