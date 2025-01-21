import serial

# Open the serial port
ser = serial.Serial("COM3", baudrate=9600, timeout=1)

print("Listening for barcode data...")
while True:
    data = ser.readline().decode("utf-8").strip()
    if data:
        print(f"Scanned Data: {data}")
        # Add your logic here
