# Importazione moduli
from machine import Pin, ADC
import dht
from time import sleep
from time import localtime
import network
import urequests
import json
from secrets import ssid, password

# Inizializzazione sensore DHT11
sensor = dht.DHT11(Pin(25))

# Inizializzazione sensore Fotoresistenza
photo = ADC(Pin(32))

# Configurazione fotoresistenza
photo.atten(ADC.ATTN_11DB)
photo.width(ADC.WIDTH_12BIT)

# Inizializzazione wifi
wifi = network.WLAN(network.STA_IF)

# Configurazione wifi
# wifi.active(False)
# sleep(0.5)
wifi.active(True)

# Connessione wifi
wifi.connect(ssid, password)

# Inizializzazione tentativi
tentatives = 0

# Attesa di connessione
for tentatives in range(9):
    print(f"{tentatives+1}. Tentativo di connessione...")
    if wifi.isconnected():
        break
    sleep(1)
    
if wifi.isconnected():
    print(f"Connesso in {tentatives} secondi")
else:
    print("Connessione non riuscita!")
    exit()
    

# Ciclo principale
while wifi.isconnected():
    # Misurazione del sensore
    sensor.measure()
    # Definizione luminosità
    light = int(round(photo.read() / 4095 * 100, 0))
    # Definizione tempo corrente
    currentDate = localtime()
    # Definizione tempo formattato
    formattedDate = "{:02d}/{:02d}/{} {:02d}:{:02d}:{:02d}".format(currentDate[2], currentDate[1], currentDate[0], currentDate[3], currentDate[4], currentDate[5])
    # Stampa nella console la temperatura e l'umidità
    # print(f"Temperatura: {sensor.temperature()}°C\nUmidità: {sensor.humidity()}%\nData: {formattedDate}\nLuminosità: {light}%\n--\n")
    # Richiesta http
    request = urequests.post("http://192.168.1.51:3000/api/data", json={"data":{"temperature":sensor.temperature(), "humidity":sensor.humidity(), "light":light, "date":formattedDate}})
    # Chiusura richiesta
    request.close()
    # Attesa di 10 secondi
    sleep(0.5)