# Importazione moduli
from machine import Pin
import dht
from time import sleep
import network
import urequests

# Inizializzazione sensore DHT11
sensor = dht.DHT11(Pin(18))

# Inizializzazione wifi
wifi = network.WLAN(network.STA_IF)

# Configurazione wifi
wifi.disconnect()
sleep(0.5)
wifi.active(True)

# Connessione wifi
wifi.connect("FASTWEB-5LED7H", "DXSL59GJ9H")

# Inizializzazione tentativi
time = 0

# Attesa di connessione
for time in range(9):
    print(f"{time+1}. Tentativo di connessione...")
    if wifi.isconnected():
        break
    sleep(1)
    
if wifi.isconnected():
    print(f"Connesso in {time} secondi")
else:
    print("Connessione non riuscita!")
    exit()
    

# Ciclo principale
while wifi.isconnected():
    # Misurazione del sensore
    sensor.measure()
    # Stampa nella console la temperatura e l'umidità
    print(f"Temperatura: {sensor.temperature()}°C\nUmidità: {sensor.humidity()}%\n--")
    # Attesa di 1 secondo
    sleep(1)