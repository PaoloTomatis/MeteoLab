# Importazione moduli
from machine import Pin
import dht
from time import sleep
import network
import urequests
import json
from secrets import ssid, password, ip

# Inizializzazione sensore DHT11
sensor = dht.DHT11(Pin(25))

# Inizializzazione wifi
wifi = network.WLAN(network.STA_IF)

# Configurazione wifi
wifi.active(False)
sleep(0.5)
wifi.active(True)

# Connessione wifi
wifi.connect(ssid, password)

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
    print(f"Temperatura: {sensor.temperature()}°C\nUmidità: {sensor.humidity()}%\n--\n")
    # Richiesta http
    urequests.request("POST", f"http://{ip}:3000/api/data", json={"data":{"temperature":sensor.temperature(), "humidity":sensor.humidity()}})
    # Attesa di 10 secondi
    sleep(10)