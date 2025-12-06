---
id: raspberry-pi-setup
title: Raspberry Pi Setup Guide
sidebar_position: 2
---

# Raspberry Pi Setup Guide

## What You'll Need

| Item | Cost |
|------|------|
| Raspberry Pi 4 (2GB+) | $35-55 |
| microSD card (32GB+) | $8-15 |
| USB-C Power Supply | $10 |
| HDMI Cable | $8 |
| USB Keyboard/Mouse | $15 |
| **Total** | **~$80-100** |

---

## Installation Steps

### 1. Prepare SD Card

1. Download **Raspberry Pi Imager**: https://www.raspberrypi.com/software/
2. Insert microSD card into computer
3. Open Imager, select:
   - OS: Raspberry Pi OS (32-bit recommended)
   - Storage: Your microSD card
4. Click Write (takes ~5 minutes)
5. Eject SD card

### 2. Boot Raspberry Pi

1. Insert SD card into Pi
2. Connect keyboard, mouse, monitor
3. Connect USB-C power → Pi starts up
4. Follow on-screen setup wizard
5. Update system:
   ```bash
   sudo apt update
   sudo apt upgrade
   ```

### 3. Enable I2C/SPI

Needed for sensor communication:

1. Open Terminal
2. Run: `sudo raspi-config`
3. Navigate to **Interfacing Options**
4. Enable **I2C**
5. Enable **SPI** (for some sensors)
6. Reboot

### 4. Install Python Libraries

For DHT sensors:

```bash
sudo pip3 install adafruit-circuitpython-dht
sudo apt-get install libgpiod2
```

---

## GPIO Pin Reference

```
          ┌─────────────────────┐
          │     HDMI 0  HDMI 1  │
          │ [ ]             [ ] │
    ┌─────┴──────────────────────┴─────┐
    │ * * * * * * * * * * * * * * * * * │ Row 1 (odd-numbered GPIO)
    │ * * * * * * * * * * * * * * * * * │ Row 2 (even-numbered GPIO)
    └─────┬──────────────────────┬─────┘
          │       USB ports      │
          │  [ ] [ ] [ ] [ ]    │
          │ Power GND 5V       │
          └─────────────────────┘

Pin 1: 3.3V    Pin 2: 5V
Pin 3: GPIO 2  Pin 4: 5V
Pin 5: GPIO 3  Pin 6: GND
...
GND is essential for all circuits!
```

---

## DHT Sensor Wiring

```
DHT11 Sensor:
Pin 1 (VCC) → Raspberry Pi 3.3V (Pin 1)
Pin 2 (Data) → GPIO 4 (Pin 7) + 10kΩ pull-up to 3.3V
Pin 4 (GND) → GND (Pin 6)
```

---

## Test Script

Create `test_dht.py`:

```python
#!/usr/bin/env python3
import board
import adafruit_dht

# Create DHT object on GPIO 4
dhtDevice = adafruit_dht.DHT11(board.D4)

try:
    while True:
        temp = dhtDevice.temperature
        humidity = dhtDevice.humidity
        print(f"Temperature: {temp}°C, Humidity: {humidity}%")
        time.sleep(2)
except KeyboardInterrupt:
    pass
finally:
    dhtDevice.deinit()
```

Run with: `python3 test_dht.py`

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| No boot | Check SD card integrity, try rewriting |
| Sensor not reading | Enable I2C, verify wiring |
| Permission denied | Use `sudo`, or add user to gpio group |
| No packages found | Run `sudo apt update` first |

---

## Next: Pick a Lesson

Ready to start? Begin with [Lesson 1.1: Reading Sensors](../module-01-physical-ai-fundamentals/chapter-01-sensors-data/lesson-01-reading-sensors)
