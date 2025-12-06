---
id: troubleshooting
title: Troubleshooting Guide
sidebar_position: 4
---

# Troubleshooting Guide

## Sensor Issues

**Problem**: "Failed to read from DHT sensor"

**Solutions**:
1. Check DHT library installed (Sketch → Include Library → Manage Libraries)
2. Verify 10kΩ pull-up resistor connected to 5V
3. Try different Arduino pin
4. Check all wiring connections carefully
5. Replace sensor (may be defective)

**Debug**: Use `Serial.println()` to print raw values and trace where reading fails.

---

## Motor Not Spinning

**Problem**: Motor connected but doesn't respond

**Check**:
- Motor driver has separate 5V power supply (NOT Arduino power)
- IN1/IN2 pins connected to Arduino PWM pins (5, 6, 9, etc.)
- Motor voltage correct (3V, 5V, 9V, 12V)
- Try `analogWrite(PIN, 255)` for full speed
- Swap IN1/IN2 if motor goes wrong direction

---

## Servo Not Moving

**Problem**: Servo connected but doesn't respond

**Critical**: Servo must have SEPARATE power supply!

```
Servo VCC (Red)   → 5V power supply
Servo GND (Black) → Arduino GND (common ground!)
Servo Signal (Yellow) → Arduino PWM pin (9, 10, etc.)
```

**Test**: `servo.write(90)` should move to center position

---

## Upload Fails

**Error**: "Could not find COM port" or timeout

**Fix**:
1. Try different USB cable
2. Reinstall CH340 driver (Windows)
3. Select correct board: Tools → Arduino Uno
4. Select correct port: Tools → Port → COM3
5. Press RESET button before uploading

---

## Garbage in Serial Monitor

**Problem**: Symbols like "쐩왝∆" instead of text

**Fix**: Baud rate mismatch!
- Check code: `Serial.begin(9600)` or `115200`
- Set monitor dropdown to match (usually 9600)

---

## Noisy Sensor Readings

**Normal!** Sensors have natural variation.

**To reduce**:
- Use moving average filter (see Lesson 1.2)
- Move away from heat sources
- Wait 30 seconds after powering on
- Add 0.1µF capacitor on power pin

---

## Raspberry Pi Won't Boot

**Check**:
- Red LED lights up?
- Try different power supply (2A minimum)
- Rewrite SD card with Raspberry Pi Imager
- Try different SD card

---

## Permission Denied (Raspberry Pi)

**Problem**: "Permission denied" running Python script

**Solution**:
```bash
sudo python3 script.py
```

---

## Can't Find Files

**Try**:
- Use full paths instead of relative paths
- Check file permissions: `ls -la`
- Verify file exists: `cat /path/to/file`

---

## Getting Help

1. Search this book for similar issues
2. Check example code comments
3. Visit Arduino forums: https://forum.arduino.cc/
4. Raspberry Pi forums: https://forums.raspberrypi.com/

When posting for help, include:
- Photo of wiring
- Error message (exact text)
- The code you're running
- What you've already tried
