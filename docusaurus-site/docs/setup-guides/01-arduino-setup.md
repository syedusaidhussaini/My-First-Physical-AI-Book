---
id: arduino-setup
title: Arduino Setup Guide
sidebar_position: 1
---

# Arduino Setup Guide

## Quick Start (10 minutes)

### What You'll Need

| Item | Cost | Where |
|------|------|-------|
| Arduino Uno | $20-30 | Amazon, Arduino.cc |
| USB Cable | $5 | Any tech store |
| Breadboard | $5 | Electronics store |
| Jumper Wires | $5 | Electronics store |
| **Total** | **~$40** | **Free shipping options available** |

### Installation Steps

1. **Download Arduino IDE**
   - Visit https://www.arduino.cc/en/software
   - Download for Windows/Mac/Linux
   - Install (next, next, finish)

2. **Connect Arduino**
   - Plug Arduino Uno to computer via USB cable
   - LED should light up on board

3. **Select Board**
   - Tools → Board → Arduino AVR Boards → Arduino Uno
   - Tools → Port → Select your COM port

4. **Upload Test Code**
   - File → Examples → Basics → Blink
   - Click Upload arrow (→)
   - LED on board should blink every second

**Success!** Your Arduino is ready.

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| No COM port showing | Install drivers, or try different USB cable |
| Upload fails | Wrong board selected, try different port |
| No LED blink | Board might be defective, try different board |
| Can't find Arduino.cc | Use mirror site: create.arduino.cc |

---

## Adding Sensor Libraries

For DHT sensors used in lessons:

1. Sketch → Include Library → Manage Libraries
2. Search "DHT"
3. Install "DHT sensor library by Adafruit"
4. Also install "Adafruit Unified Sensor"

---

## Board Specifications

- **Voltage**: 5V logic, 3.3V sensor compatible
- **PWM Pins**: 3, 5, 6, 9, 10, 11
- **Analog Input**: A0-A5 (10-bit resolution)
- **Memory**: 32KB flash, 2KB SRAM

---

## Next: Pick a Lesson

Ready to start? Begin with [Lesson 1.1: Reading Sensors](../module-01-physical-ai-fundamentals/chapter-01-sensors-data/lesson-01-reading-sensors)
