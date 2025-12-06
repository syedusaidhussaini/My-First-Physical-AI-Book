---
id: lesson-01-reading-sensors
title: Reading Temperature and Humidity Sensors
sidebar_position: 1
---

# Reading Temperature and Humidity Sensors

## Learning Objectives

By the end of this lesson, you will:
- Connect DHT11/DHT22 temperature sensor to microcontroller
- Read temperature and humidity values from sensor
- Understand sensor specifications and calibration
- Parse and display sensor data in human-readable format

## Prerequisites

- Basic understanding of electrical circuits (voltage, current)
- Familiarity with Arduino IDE or equivalent

**Estimated Duration**: 45-60 minutes (including hands-on project)

**Hardware Requirements** (choose one):
- **Option 1 (Hardware)**: Arduino Uno/Nano + DHT11 sensor + 10kΩ resistor + breadboard
- **Option 2 (Simulator)**: Any web browser, no installation needed ← **Start here for quick demo!**

---

## Why This Matters

Temperature sensors are fundamental to Physical AI applications. From smart homes to robots adjusting behavior based on thermal feedback, understanding sensor data is essential.

---

## Working Code Example

### Quick Start: Web Simulator

Click the button below to test the simulator:

```html
<!DOCTYPE html>
<html>
<head>
<style>
body { font-family: Arial; max-width: 600px; margin: 50px auto; padding: 20px; background: #f5f5f5; }
.sim { background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
.display { background: #222; color: #0f0; padding: 20px; border-radius: 4px; font-family: monospace; margin: 20px 0; min-height: 100px; }
button { padding: 10px 20px; background: #0066cc; color: white; border: none; border-radius: 4px; cursor: pointer; margin: 5px; }
button:hover { background: #0052a3; }
.reading { margin: 10px 0; font-size: 16px; }
</style>
</head>
<body>
<div class="sim">
<h2>🌡️ DHT Sensor Simulator</h2>
<button onclick="readSensor()">Read Sensor</button>
<button onclick="resetSensor()">Reset</button>
<div class="display">
<div class="reading">Status: <span id="status">Ready</span></div>
<div class="reading">Temperature: <span id="temp">--</span> °C</div>
<div class="reading">Humidity: <span id="humidity">--</span> %</div>
</div>
</div>
<script>
function readSensor() {
  const temp = (22 + (Math.random()-0.5)*4).toFixed(1);
  const humidity = Math.max(0, Math.min(100, 55 + (Math.random()-0.5)*20)).toFixed(1);
  document.getElementById('temp').textContent = temp;
  document.getElementById('humidity').textContent = humidity;
  document.getElementById('status').textContent = '✓ Success';
}
function resetSensor() {
  document.getElementById('temp').textContent = '--';
  document.getElementById('humidity').textContent = '--';
  document.getElementById('status').textContent = 'Ready';
}
</script>
</body>
</html>
```

### Arduino Code

```cpp
#include "DHT.h"

#define DHTPIN 2
#define DHTTYPE DHT11

DHT dht(DHTPIN, DHTTYPE);

void setup() {
  Serial.begin(9600);
  delay(2000);
  dht.begin();
  Serial.println("DHT Sensor initialized!");
}

void loop() {
  delay(2000);

  float humidity = dht.readHumidity();
  float temperature = dht.readTemperature();

  if (isnan(humidity) || isnan(temperature)) {
    Serial.println("ERROR: Failed to read from DHT sensor!");
    return;
  }

  Serial.print("Temperature: ");
  Serial.print(temperature);
  Serial.print("°C  |  Humidity: ");
  Serial.print(humidity);
  Serial.println("%");
}
```

---

## Detailed Explanation

### DHT Sensor Types

| Feature | DHT11 | DHT22 |
|---------|-------|-------|
| Temperature Range | 0-50°C | -40 to 80°C |
| Humidity Range | 20-90% | 0-100% |
| Accuracy | ±2°C, ±5% | ±0.5°C, ±2% |
| Cost | $1-2 | $5-10 |

### How It Works

1. **Physical Measurement**: Capacitive sensor measures humidity, thermistor measures temperature
2. **Digital Conversion**: Sensor converts to digital signal
3. **Arduino Reception**: Reads data through data pin
4. **Library Processing**: DHT library decodes the protocol
5. **Your Code**: Calls `readTemperature()` and `readHumidity()`

### Wiring Diagram

```
        +5V
         |
        [10kΩ]
         |
    ┌────┴────┐
    |  DHT11  |
    │ 1 2 3 4 │
    └────┬────┘
         |
    Pin1: VCC → +5V
    Pin2: Data → Arduino D2 (with pull-up resistor)
    Pin4: GND → Arduino GND
```

---

## Hands-On Project

### Project: Temperature Monitor

**Goal**: Display real-time temperature and humidity readings

**Hardware Path** (20 minutes):
1. Install Arduino IDE
2. Install DHT library (Sketch → Include Library → Manage → Search "DHT" → Install)
3. Connect sensor as shown in wiring diagram
4. Copy Arduino code above
5. Upload to Arduino
6. Open Serial Monitor (Ctrl+Shift+M, baud 9600)
7. Watch readings update every 2 seconds!

**Simulator Path** (2 minutes):
1. Copy HTML code above
2. Save as `simulator.html`
3. Open in browser
4. Click "Read Sensor" button
5. See simulated readings!

---

## Common Issues & Solutions

| Problem | Solution |
|---------|----------|
| "Failed to read from DHT" | Check wiring, verify pull-up resistor present |
| No readings show | Wrong sensor type in code, change DHT11 ↔ DHT22 |
| Readings always same | Normal if room conditions stable |
| Garbage data | Loose wiring, reseat jumper wires |

---

## Safety First ⚠️

:::warning
- DHT sensors use 3.3V or 5V only - never use 12V
- Verify voltage with multimeter before connecting
- Wiring errors can damage Arduino
:::

---

## Key Concepts

- **DHT sensors** measure temperature and humidity
- **Pull-up resistor** (10kΩ) is required for reliable reading
- **Serial Monitor** displays data on your computer
- **2-second delay** allows sensor to settle between readings
- **Sensor variations** are normal - you're reading real air!

---

## Next Lesson

Ready to filter noisy data? Continue to **Lesson 1.2: Filtering Sensor Data** →
