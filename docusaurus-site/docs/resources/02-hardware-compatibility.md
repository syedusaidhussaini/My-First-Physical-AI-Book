---
id: hardware-compatibility
title: Hardware Compatibility
sidebar_position: 2
---

# Hardware Compatibility Guide

## Arduino Boards Tested

| Board | Voltage | Flash | SRAM | PWM Pins | Cost | Status |
|-------|---------|-------|------|----------|------|--------|
| Arduino Uno | 5V | 32KB | 2KB | 3,5,6,9,10,11 | $25-30 | ✅ Recommended |
| Arduino Nano | 5V | 30KB | 2KB | 3,5,6,9,10,11 | $20-25 | ✅ Works |
| Arduino Mega | 5V | 256KB | 8KB | Many | $35-40 | ✅ Works |
| Arduino MKR | 3.3V | 256KB | 32KB | Multiple | $30-40 | ✅ Works |

**Recommendation**: Start with **Arduino Uno** - most compatible, best tutorials, widest library support.

---

## Raspberry Pi Versions

| Board | Speed | RAM | GPIO | Cost | Status |
|-------|-------|-----|------|------|--------|
| Raspberry Pi 4 (2GB) | 1.5GHz | 2GB | 40 pins | $35 | ✅ Recommended |
| Raspberry Pi 4 (4GB) | 1.5GHz | 4GB | 40 pins | $55 | ✅ Works |
| Raspberry Pi 3B+ | 1.4GHz | 1GB | 40 pins | $35 | ✅ Works |
| Raspberry Pi Zero | 1GHz | 512MB | 40 pins | $10 | ⚠️ Slow |

**Recommendation**: **Raspberry Pi 4 (2GB)** - best value, fast enough for all projects.

---

## Sensors

### Temperature/Humidity

| Sensor | Range | Accuracy | Cost | Notes |
|--------|-------|----------|------|-------|
| DHT11 | 0-50°C | ±2°C | $1-2 | Good starter sensor |
| DHT22 | -40-80°C | ±0.5°C | $5-10 | More accurate |
| DS18B20 | -55-125°C | ±0.5°C | $1-2 | Digital, reliable |
| LM35 | -55-150°C | ±0.5°C | $2-3 | Analog output |

**Recommendation for lessons**: **DHT11** - cheapest, good documentation, works great for learning.

---

## Motors

### DC Motors

| Type | Voltage | Speed | Torque | Cost | Notes |
|------|---------|-------|--------|------|-------|
| Micro DC | 3V | High | Low | $2-3 | Good starter |
| Standard DC | 5-9V | Medium | Medium | $3-5 | Versatile |
| Geared DC | 5-9V | Low | High | $5-10 | For heavy loads |

### Servo Motors

| Type | Voltage | Range | Torque | Cost | Notes |
|------|---------|-------|--------|------|-------|
| Micro Servo (SG90) | 5V | 0-180° | 1.2kg-cm | $3-5 | Popular, reliable |
| Standard Servo | 5V | 0-180° | 2-4kg-cm | $5-10 | Better build quality |
| Metal Servo | 5V | 0-180° | 4-6kg-cm | $15-30 | Durable, stronger |

**Recommendation for lessons**: **SG90 Micro Servo** - most affordable, sufficient for educational projects, widely available.

---

## Motor Drivers

| Driver | Max Current | Voltage | Channels | Cost | Status |
|--------|------------|---------|----------|------|--------|
| L298N | 2A | 5-35V | 2 motors | $2-3 | ✅ Recommended |
| L9110S | 0.8A | 3-12V | 2 motors | $1-2 | ✅ Works |
| DRV8833 | 1.5A | 3-10V | 2 motors | $2-3 | ✅ Works |
| L6230 | 5A | 8-52V | 1 motor | $5-8 | For heavy duty |

**Recommendation**: **L298N** - most tutorials available, robust, handles most motors.

---

## Compatibility Matrix: Lessons

### Lesson 1.1: Reading Sensors ✅

| Component | Tested Boards | Notes |
|-----------|---------------|-------|
| DHT11 | Arduino Uno/Nano/Mega, RPi 4 | Needs 10kΩ pull-up resistor |
| DHT22 | Arduino Uno/Nano/Mega, RPi 4 | Same wiring as DHT11 |

**Status**: All boards fully compatible ✅

---

### Lesson 1.2: Filtering Data ✅

| Component | Tested Boards | Notes |
|-----------|---------------|-------|
| Same sensors as 1.1 | All boards | Just adds filtering code |

**Status**: All boards fully compatible ✅

---

### Lesson 2.1: Motor Control ⚠️

| Component | Tested Boards | Notes |
|-----------|---------------|-------|
| L298N Driver | Arduino Uno/Nano/Mega | Need separate 5V power supply |
| DC Motor 3-9V | Arduino Uno/Nano/Mega | Can't use RPi GPIO directly (current limit) |

**Status**: Arduino fully supported; RPi needs additional components ✅

---

### Lesson 2.2: Servo Control ✅

| Component | Tested Boards | Notes |
|-----------|---------------|-------|
| SG90 Servo | Arduino Uno/Nano/Mega, RPi 4 | Needs separate 5V power supply |

**Status**: All boards with PWM pins ✅

---

## What You Need: Shopping List

### Minimal Setup (Simulator only)
- **Cost**: $0 (browser-based)
- **Items**: None! Use any computer

### Arduino Beginner Kit
- Arduino Uno: $25
- DHT11 Sensor: $2
- Breadboard: $5
- Jumper Wires: $5
- **Total**: ~$40

### Complete Arduino + Motors
- Arduino Uno: $25
- DHT11 Sensor: $2
- L298N Motor Driver: $3
- DC Motor: $3
- SG90 Servo: $4
- Breadboard: $5
- Jumper Wires: $5
- USB Cable: $3
- Power Supply: $8
- **Total**: ~$60

### Raspberry Pi Starter
- Raspberry Pi 4 (2GB): $35
- microSD Card 32GB: $10
- Power Supply 5V/3A: $12
- DHT22 Sensor: $5
- **Total**: ~$65

---

## Sourcing Hardware

### Local

- **RadioShack** (if nearby)
- **Micro Center** (US)
- Local electronics shops

### Online (US)

- **Amazon**: Fast delivery, good prices
- **Adafruit**: Official Arduino partner, great tutorials
- **SparkFun**: High quality, educational resources
- **AliExpress**: Cheapest (2-4 week delivery)

### Online (International)

- **eBay**: Global sellers
- **Local Amazon site**: (amazon.co.uk, amazon.de, etc.)
- **DX.com**: Worldwide shipping
- **Banggood**: Asian electronics

---

## Tips for Buying

1. **Start small**: Don't buy everything at once
2. **Read reviews**: Check before ordering
3. **Buy from reputable sellers**: Avoid fakes (DHT11 counterfeits are common)
4. **Order extras**: Sensors often fail; buy 2-3
5. **Look for bundles**: Arduino starter kits often cheaper than individual items

---

## Alternatives

### Instead of DHT11: Other sensors
- **TMP36**: Analog temperature (simpler to use)
- **DS18B20**: One-wire digital temperature (very reliable)

### Instead of Arduino: Other boards
- **ESP32**: WiFi-enabled Arduino with more power
- **STM32**: Industrial microcontroller, more features
- **Teensy**: Arduino-compatible, much faster

### Instead of Raspberry Pi: Other computers
- **Orange Pi**: Cheaper RPi alternative
- **Rock Pi**: More powerful
- **NVIDIA Jetson**: For AI/ML applications
