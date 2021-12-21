# spent-my-money

WHEN the user inputs an expense or deposit
THEN they will receive a notification that they have added an expense or deposit

Table and graph updates indicating what the transaction is for and what amount immediately

WHEN the user reestablishes an internet connection
THEN the deposits or expenses added while they were offline are added to their transaction history and their totals are updated

Transaction is stored into idb and the service worker updates it once the app is reconnected to online 
